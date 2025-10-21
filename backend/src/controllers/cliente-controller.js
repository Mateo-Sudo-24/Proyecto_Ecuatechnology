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

// --- GESTIÓN DE PERFIL DEL CLIENTE ---

export const getClientProfile = async (req, res) => {
    try {
        const clienteId = req.auth.clienteId;

        const cliente = await prisma.cliente.findUnique({
            where: { id: clienteId },
            select: {
                id: true,
                nombre: true,
                email: true,
                telefono: true,
                confirmEmail: true,
                createdAt: true
            }
        });

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        res.json({
            message: "Perfil obtenido con éxito.",
            profile: cliente
        });

    } catch (error) {
        res.status(500).json({ error: "Error al obtener el perfil.", details: error.message });
    }
};

export const updateClientProfile = async (req, res) => {
    try {
        const clienteId = req.auth.clienteId;
        const { nombre, telefono } = req.body;

        // Verificar si el cliente existe
        const clienteExistente = await prisma.cliente.findUnique({
            where: { id: clienteId }
        });

        if (!clienteExistente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        // Actualizar el perfil
        const clienteActualizado = await prisma.cliente.update({
            where: { id: clienteId },
            data: {
                nombre: nombre || clienteExistente.nombre,
                telefono: telefono !== undefined ? telefono : clienteExistente.telefono
            },
            select: {
                id: true,
                nombre: true,
                email: true,
                telefono: true,
                confirmEmail: true,
                createdAt: true
            }
        });

        res.json({
            message: "Perfil actualizado con éxito.",
            profile: clienteActualizado
        });

    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el perfil.", details: error.message });
    }
};

export const changeClientPassword = async (req, res) => {
    try {
        const clienteId = req.auth.clienteId;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Se requieren la contraseña actual y la nueva contraseña." });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres." });
        }

        // Obtener el cliente actual
        const cliente = await prisma.cliente.findUnique({
            where: { id: clienteId }
        });

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        // Verificar la contraseña actual
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, cliente.password);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({ message: "La contraseña actual es incorrecta." });
        }

        // Hash de la nueva contraseña
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña
        await prisma.cliente.update({
            where: { id: clienteId },
            data: { password: hashedNewPassword }
        });

        res.json({ message: "Contraseña cambiada con éxito." });

    } catch (error) {
        res.status(500).json({ error: "Error al cambiar la contraseña.", details: error.message });
    }
};

// --- ESTADÍSTICAS AVANZADAS DEL CLIENTE ---

export const getClientStatistics = async (req, res) => {
    try {
        const clienteId = req.auth.clienteId;

        // Obtener información básica del cliente
        const cliente = await prisma.cliente.findUnique({
            where: { id: clienteId },
            select: {
                id: true,
                nombre: true,
                email: true,
                createdAt: true
            }
        });

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado." });
        }

        // Obtener todos los tickets del cliente
        const tickets = await prisma.ticket.findMany({
            where: { clienteId },
            select: {
                id: true,
                estado: true,
                precioTotal: true,
                createdAt: true,
                proformaEstado: true
            }
        });

        // Calcular estadísticas básicas
        const totalTickets = tickets.length;
        const ticketsPorEstado = tickets.reduce((acc, ticket) => {
            acc[ticket.estado] = (acc[ticket.estado] || 0) + 1;
            return acc;
        }, {});

        const proformasPendientes = tickets.filter(t => t.estado === "Esperando Aprobación").length;

        // Calcular estadísticas temporales
        const ahora = new Date();
        const mesActual = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
        const mesAnterior = new Date(ahora.getFullYear(), ahora.getMonth() - 1, 1);

        const ticketsMesActual = tickets.filter(t => t.createdAt >= mesActual).length;
        const ticketsMesAnterior = tickets.filter(t => t.createdAt >= mesAnterior && t.createdAt < mesActual).length;

        // Calcular estadísticas financieras
        const ticketsConPrecio = tickets.filter(t => t.precioTotal !== null);
        const totalGastado = ticketsConPrecio.reduce((sum, t) => sum + (t.precioTotal || 0), 0);
        const promedioPorTicket = ticketsConPrecio.length > 0 ? totalGastado / ticketsConPrecio.length : 0;

        // Estadísticas de proformas
        const proformasPorEstado = tickets.reduce((acc, ticket) => {
            const estado = ticket.proformaEstado || 'Sin Proforma';
            acc[estado] = (acc[estado] || 0) + 1;
            return acc;
        }, {});

        // Tiempo como cliente (en días)
        const diasComoCliente = Math.floor((ahora - cliente.createdAt) / (1000 * 60 * 60 * 24));

        const estadisticas = {
            cliente: {
                nombre: cliente.nombre,
                email: cliente.email,
                diasComoCliente,
                fechaRegistro: cliente.createdAt
            },
            resumen: {
                totalTickets,
                proformasPendientes,
                totalGastado: parseFloat(totalGastado.toFixed(2)),
                promedioPorTicket: parseFloat(promedioPorTicket.toFixed(2))
            },
            porEstado: ticketsPorEstado,
            porProforma: proformasPorEstado,
            temporales: {
                ticketsMesActual,
                ticketsMesAnterior,
                crecimientoMensual: ticketsMesAnterior > 0 ?
                    Math.round(((ticketsMesActual - ticketsMesAnterior) / ticketsMesAnterior) * 100) : 0
            }
        };

        res.json({
            message: "Estadísticas obtenidas con éxito.",
            statistics: estadisticas
        });

    } catch (error) {
        res.status(500).json({ error: "Error al obtener las estadísticas.", details: error.message });
    }
};

export const getClientTicketStats = async (req, res) => {
    try {
        const clienteId = req.auth.clienteId;

        const tickets = await prisma.ticket.findMany({
            where: { clienteId },
            select: {
                id: true,
                estado: true,
                precioTotal: true,
                createdAt: true,
                proformaEstado: true,
                diagnostico: true,
                proformaDetalles: true
            },
            orderBy: { createdAt: 'desc' }
        });

        // Estadísticas detalladas por estado
        const estadosDetalle = tickets.reduce((acc, ticket) => {
            const estado = ticket.estado;
            if (!acc[estado]) {
                acc[estado] = {
                    count: 0,
                    total: 0,
                    tickets: []
                };
            }
            acc[estado].count++;
            acc[estado].total += ticket.precioTotal || 0;
            acc[estado].tickets.push({
                id: ticket.id,
                descripcion: ticket.descripcion || 'Sin descripción',
                precio: ticket.precioTotal,
                fecha: ticket.createdAt,
                proformaEstado: ticket.proformaEstado
            });
            return acc;
        }, {});

        // Tickets recientes (últimos 10)
        const ticketsRecientes = tickets.slice(0, 10).map(ticket => ({
            id: ticket.id,
            descripcion: ticket.descripcion || 'Sin descripción',
            estado: ticket.estado,
            precio: ticket.precioTotal,
            fecha: ticket.createdAt,
            proformaEstado: ticket.proformaEstado
        }));

    } catch (error) {
        res.status(500).json({ error: "Error al obtener estadísticas de tickets.", details: error.message });
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