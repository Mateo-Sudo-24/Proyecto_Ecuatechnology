// controllers/administrador-controller.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMailToRegister, sendMailOTP } from "../config/nodemailer.js";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "ECUATECH_SECRET"; // Usa variable de entorno

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existe = await prisma.administrador.findUnique({ where: { email } });
    if (existe) return res.status(400).json({ message: "El administrador ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = Math.random().toString(36).slice(2);

    await sendMailToRegister(email, token)

    const admin = await prisma.administrador.create({
      data: { email, password: hashedPassword, token },
    });

    res.json({ message: "Administrador registrado con éxito, Confirma tu correo. ", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const admin = await prisma.administrador.findFirst({ where: { token } });
    if (!admin) return res.status(400).json({ message: "Token inválido" });

    await prisma.administrador.update({
      where: { id: admin.id },
      data: { confirmEmail: true, token: null },
    });

    res.json({ message: "Correo confirmado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.administrador.findUnique({ where: { email } });
    if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });

    if (!admin.confirmEmail) return res.status(401).json({ message: "Confirma tu correo" });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Contraseña incorrecta" });

     const otp = Math.floor(100000 + Math.random() * 900000).toString();
     const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // expira en 5 min

    await prisma.administrador.update({
      where: { id: admin.id },
      data: { otp, otpExpires },
    });

    await sendMailOTP(admin.email, otp);

    res.json({ message: "OTP enviado al correo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await prisma.administrador.findUnique({ where: { email } });
    if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });

    if (admin.otp !== otp) return res.status(401).json({ message: "OTP inválido" });

    // 🔹 Validar expiración
    if (new Date() > admin.otpExpires) {
      return res.status(401).json({ message: "OTP expirado, solicita uno nuevo" });
    }

    // OTP correcto → limpiar OTP
    await prisma.administrador.update({
      where: { id: admin.id },
      data: { otp: null, otpExpires: null },
    });

    const token = jwt.sign({ id: admin.id, email: admin.email, type: 'admin' }, SECRET, { expiresIn: "2h" });


    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAdmins = async (req, res) => {
  try {
    const admins = await prisma.administrador.findMany();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await prisma.administrador.findUnique({ where: { id: Number(id) } });
    if (!admin) return res.status(404).json({ message: "No encontrado" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const data = {};
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);

    const admin = await prisma.administrador.update({
      where: { id: Number(id) },
      data,
    });

    res.json({ message: "Administrador actualizado", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.administrador.delete({ where: { id: Number(id) } });
    res.json({ message: "Administrador eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- GESTIÓN DE TICKETS (Simulación del Flujo de Trabajo) ---

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: { cliente: { select: { nombre: true, email: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las solicitudes.", details: error.message });
    }
};

export const updateTicketDiagnosis = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { diagnostico } = req.body;
        
        const ticket = await prisma.ticket.update({
            where: { id: Number(ticketId) },
            data: {
                diagnostico,
                estado: "En Diagnóstico"
            }
        });
        res.json({ message: "Diagnóstico agregado con éxito.", ticket });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el diagnóstico.", details: error.message });
    }
};

export const createTicketProforma = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { proformaDetalles, precioTotal } = req.body;

        const ticket = await prisma.ticket.update({
            where: { id: Number(ticketId) },
            data: {
                proformaDetalles,
                precioTotal: parseFloat(precioTotal),
                estado: "Esperando Aprobación",
                proformaEstado: "Enviado"
            }
        });
        res.json({ message: "Proforma creada y enviada para aprobación del cliente.", ticket });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la proforma.", details: error.message });
    }
};

export const updateTicketStatus = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { nuevoEstado } = req.body; // ej: "En Reparación", "Completado", "Listo para Entrega"

        const ticket = await prisma.ticket.update({
            where: { id: Number(ticketId) },
            data: { estado: nuevoEstado }
        });
        res.json({ message: `El estado de la solicitud ha sido actualizado a: ${nuevoEstado}`, ticket });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el estado.", details: error.message });
    }
};

// --- SIMULACIÓN DE FACTURACIÓN ---

export const getInvoiceXML = (req, res) => {
    const { ticketId } = req.params;
    
    // Datos quemados para la simulación
    const fakeXML = `<?xml version="1.0" encoding="UTF-8"?>
<factura id="comprobante" version="1.1.0">
    <infoTributaria>
        <ambiente>2</ambiente>
        <tipoEmision>1</tipoEmision>
        <razonSocial>ECUATECHNOLOGY S.A.</razonSocial>
        <nombreComercial>ECUATECHNOLOGY</nombreComercial>
        <ruc>0999999999001</ruc>
        <claveAcceso>mock_clave_acceso_${ticketId}_${Date.now()}</claveAcceso>
        <codDoc>01</codDoc>
        <estab>001</estab>
        <ptoEmi>001</ptoEmi>
        <secuencial>000000123</secuencial>
        <dirMatriz>AV. 9 DE OCTUBRE Y MALECON</dirMatriz>
    </infoTributaria>
    <infoFactura>
        <fechaEmision>25/09/2025</fechaEmision>
        <totalSinImpuestos>150.00</totalSinImpuestos>
        <totalConImpuestos>
            <totalImpuesto>
                <codigo>2</codigo>
                <codigoPorcentaje>2</codigoPorcentaje>
                <baseImponible>150.00</baseImponible>
                <valor>18.00</valor>
            </totalImpuesto>
        </totalConImpuestos>
        <importeTotal>168.00</importeTotal>
        <moneda>DOLAR</moneda>
    </infoFactura>
</factura>`;

    res.header('Content-Type', 'application/xml');
    res.send(fakeXML);
};

export const getInvoicePDF = (req, res) => {
    const { ticketId } = req.params;
    
    // En un caso real, generarías un PDF y lo enviarías.
    // Aquí, simplemente devolvemos un JSON con un enlace a un PDF de muestra.
    res.json({
        message: "PDF de factura generado (simulación).",
        ticketId: ticketId,
        // URL de un PDF genérico para pruebas
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    });
};