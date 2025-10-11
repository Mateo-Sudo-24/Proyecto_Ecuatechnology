import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMailToRegister, sendMailOTP } from "../config/nodemailer.js";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "ECUATECH_WEB_SECRET";

// --- AUTENTICACIÓN DE CLIENTES ---
export const registerCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, password } = req.body;
    const existe = await prisma.cliente.findUnique({ where: { email } });
    if (existe) return res.status(400).json({ message: "El correo ya está registrado." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = Math.random().toString(36).substring(2);

     await sendMailToRegister(email, token);

    const cliente = await prisma.cliente.create({
      data: { nombre, email, telefono, password: hashedPassword, token },
    });

    res.status(201).json({ message: "Registro exitoso. Revisa tu correo para confirmar la cuenta.", clienteId: cliente.id });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el cliente.", details: error.message });
  }
};


export const confirmEmailCliente = async (req, res) => {
  try {
    const { token } = req.params;
    const cliente = await prisma.cliente.findFirst({ where: { token } });
    if (!cliente) return res.status(400).json({ message: "Token inválido o expirado." });

    await prisma.cliente.update({
      where: { id: cliente.id },
      data: { confirmEmail: true, token: null },
    });

    res.json({ message: "Correo confirmado con éxito." });
  } catch (error) {
    res.status(500).json({ error: "Error al confirmar el correo.", details: error.message });
  }
};

export const loginCliente = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cliente = await prisma.cliente.findUnique({ where: { email } });
    if (!cliente || !cliente.confirmEmail) return res.status(401).json({ message: "Credenciales incorrectas o correo no confirmado." });

    const isPasswordValid = await bcrypt.compare(password, cliente.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Credenciales incorrectas." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.cliente.update({
      where: { id: cliente.id },
      data: { otp, otpExpires },
    });

    await sendMailOTP(cliente.email, otp);

    res.json({ message: "Se ha enviado un código de verificación a tu correo." });
  } catch (error) {
    res.status(500).json({ error: "Error durante el inicio de sesión.", details: error.message });
  }
};

export const verifyOTPCliente = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const cliente = await prisma.cliente.findUnique({ where: { email } });
    if (!cliente || cliente.otp !== otp || new Date() > cliente.otpExpires) {
      return res.status(401).json({ message: "Código de verificación inválido o expirado." });
    }

    await prisma.cliente.update({
      where: { id: cliente.id },
      data: { otp: null, otpExpires: null },
    });

    const token = jwt.sign({ clienteId: cliente.id, email: cliente.email, type: 'cliente' }, SECRET, { expiresIn: "12h" });

    res.json({ message: "Inicio de sesión exitoso.", token });
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el código.", details: error.message });
  }
};


// --- GESTIÓN DE TICKETS Y PROFORMAS (Cliente) ---

export const createTicket = async (req, res) => {
  try {
    const { descripcion } = req.body;
    const clienteId = req.auth.clienteId; // Obtenido del JWT verificado

    const ticket = await prisma.ticket.create({
      data: {
        descripcion,
        clienteId,
      },
    });
    res.status(201).json({ message: "Solicitud de servicio creada con éxito.", ticket });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la solicitud.", details: error.message });
  }
};

export const getClientTickets = async (req, res) => {
  try {
    const clienteId = req.auth.clienteId;
    const tickets = await prisma.ticket.findMany({
      where: { clienteId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las solicitudes.", details: error.message });
  }
};

// ¡NUEVO Y CRÍTICO! Endpoint para que el cliente apruebe o rechace
export const processProforma = async (req, res) => {
    try {
        const { ticketId, action } = req.body; // action puede ser 'aprobar' o 'rechazar'
        const clienteId = req.auth.clienteId;

        if (!['aprobar', 'rechazar'].includes(action)) {
            return res.status(400).json({ message: "Acción no válida." });
        }

        const ticket = await prisma.ticket.findFirst({
            where: { id: Number(ticketId), clienteId }
        });

        if (!ticket) {
            return res.status(404).json({ message: "Solicitud no encontrada o no pertenece a este cliente." });
        }
        if (ticket.estado !== 'Esperando Aprobación') {
            return res.status(400).json({ message: "Esta solicitud no está esperando una aprobación en este momento." });
        }

        const nuevoEstado = action === 'aprobar' ? 'En Reparación' : 'Rechazado';
        const nuevoEstadoProforma = action === 'aprobar' ? 'Aprobado' : 'Rechazado';

        const updatedTicket = await prisma.ticket.update({
            where: { id: Number(ticketId) },
            data: {
                estado: nuevoEstado,
                proformaEstado: nuevoEstadoProforma,
            }
        });

        res.json({ message: `Proforma ${nuevoEstadoProforma.toLowerCase()} con éxito.`, ticket: updatedTicket });

    } catch (error) {
        res.status(500).json({ error: "Error al procesar la proforma.", details: error.message });
    }
};

export const getClientInvoicePDF = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const clienteId = req.auth.clienteId;

        // ¡VERIFICACIÓN DE SEGURIDAD CRÍTICA!
        // Asegurarse de que el ticket que se solicita pertenece al cliente que está autenticado.
        const ticket = await prisma.ticket.findFirst({
            where: {
                id: Number(ticketId),
                clienteId: clienteId
            }
        });

        if (!ticket) {
            return res.status(404).json({ message: "Factura no encontrada o no tienes permiso para acceder a ella." });
        }
        
        // Si la verificación es exitosa, devolvemos los datos simulados.
        res.json({
            message: "PDF de factura generado (simulación).",
            ticketId: ticketId,
            // Enlace a un PDF de muestra para que el frontend pueda probar la descarga.
            pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        });

    } catch (error) {
        res.status(500).json({ error: "Error al obtener la factura.", details: error.message });
    }
};