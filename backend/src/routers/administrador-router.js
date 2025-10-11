// src/routers/administrador.router.js (VERSIÓN FINAL Y UNIFICADA)
import express from "express";

// --- Importación de TODOS los controladores necesarios ---
import {
  // Autenticación y CRUD de Admins
  registerAdmin,
  confirmEmail,
  loginAdmin,
  verifyOTP,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  // Gestión de Tickets y Flujo de Trabajo
  getAllTickets,
  updateTicketDiagnosis,
  createTicketProforma,
  updateTicketStatus,
  // Facturación
  getInvoiceXML,
  getInvoicePDF,
  // Descarga de Tickets
  downloadTicketPDF,
} from "../controllers/administrador-controllers.js";

// --- Importación de Middlewares de Autenticación y Roles ---
// Usaremos un conjunto de nombres consistente para los middlewares
import {
  authenticateJWT,
  requireAdminRole,
  protectFirstAdminCreation,
} from "../middlewares/AuthMiddleware.js";

// --- Importación de Middlewares de Validación ---
import {
  validateAdminCreation,
  validateLogin,
  validateAdminId,
  validateAdminUpdate,
} from "../middlewares/validator.js";

const router = express.Router();

// ===============================================
// --- RUTAS PÚBLICAS DE AUTENTICACIÓN ---
// ===============================================

/**
 * @route   POST /api/admin/register
 * @desc    Registrar un nuevo administrador. Protegido si ya existe al menos un admin.
 * @access  Público/Privado
 */
router.post("/register", protectFirstAdminCreation, validateAdminCreation, registerAdmin);

/**
 * @route   GET /api/admin/confirm/:token
 * @desc    Confirmar el correo de un administrador recién registrado.
 * @access  Público
 */
router.get("/confirm/:token", confirmEmail);

/**
 * @route   POST /api/admin/login
 * @desc    Iniciar sesión (Paso 1: Envía OTP).
 * @access  Público
 */
router.post("/login", validateLogin, loginAdmin);

/**
 * @route   POST /api/admin/verify-otp
 * @desc    Verificar OTP para completar el login y obtener el JWT.
 * @access  Público
 */
router.post("/verify-otp", verifyOTP);

// ==========================================================
// --- RUTAS PROTEGIDAS PARA GESTIÓN DE TICKETS Y FLUJO ---
// ==========================================================

/**
 * @route   GET /api/admin/tickets
 * @desc    Ver todas las solicitudes de servicio de todos los clientes.
 * @access  Privado (Solo Admins)
 */
router.get("/tickets", authenticateJWT, requireAdminRole, getAllTickets);

/**
 * @route   POST /api/admin/tickets/:ticketId/diagnose
 * @desc    Agregar un diagnóstico a un ticket.
 * @access  Privado (Solo Admins)
 */
router.post("/tickets/:ticketId/diagnose", authenticateJWT, requireAdminRole, updateTicketDiagnosis);

/**
 * @route   POST /api/admin/tickets/:ticketId/proforma
 * @desc    Crear y enviar la proforma para un ticket.
 * @access  Privado (Solo Admins)
 */
router.post("/tickets/:ticketId/proforma", authenticateJWT, requireAdminRole, createTicketProforma);

/**
 * @route   POST /api/admin/tickets/:ticketId/status
 * @desc    Actualizar el estado de un ticket.
 * @access  Privado (Solo Admins)
 */
router.post("/tickets/:ticketId/status", authenticateJWT, requireAdminRole, updateTicketStatus);

/**
 * @route   GET /api/admin/tickets/:ticketId/invoice/xml
 * @desc    Obtener el XML de la factura de un ticket.
 * @access  Privado (Solo Admins)
 */
router.get("/tickets/:ticketId/invoice/xml", authenticateJWT, requireAdminRole, getInvoiceXML);

/**
 * @route   GET /api/admin/tickets/:ticketId/invoice/pdf
 * @desc    Obtener la URL del PDF de la factura de un ticket.
 * @access  Privado (Solo Admins)
 */
router.get("/tickets/:ticketId/invoice/pdf", authenticateJWT, requireAdminRole, getInvoicePDF);

/**
 * @route   GET /api/admin/tickets/:ticketId/download
 * @desc    Descargar el ticket en formato PDF/HTML.
 * @access  Privado (Solo Admins)
 */
router.get("/tickets/:ticketId/download", authenticateJWT, requireAdminRole, downloadTicketPDF);


// ========================================================
// --- RUTAS PROTEGIDAS PARA GESTIÓN DE OTROS ADMINS (CRUD) ---
// ========================================================
// Todas las rutas aquí requieren un token de admin válido.

/**
 * @route   GET /api/admin/
 * @desc    Obtener la lista de todos los administradores.
 * @access  Privado (Solo Admins)
 */
router.get("/", authenticateJWT, requireAdminRole, getAdmins);

/**
 * @route   GET /api/admin/:id
 * @desc    Obtener un administrador por su ID.
 * @access  Privado (Solo Admins)
 */
router.get("/:id", authenticateJWT, requireAdminRole, validateAdminId, getAdminById);

/**
 * @route   PUT /api/admin/:id
 * @desc    Actualizar la información de un administrador.
 * @access  Privado (Solo Admins)
 */
router.put("/:id", authenticateJWT, requireAdminRole, validateAdminId, validateAdminUpdate, updateAdmin);

/**
 * @route   DELETE /api/admin/:id
 * @desc    Eliminar una cuenta de administrador.
 * @access  Privado (Solo Admins)
 */
router.delete("/:id", authenticateJWT, requireAdminRole, validateAdminId, deleteAdmin);




export default router;