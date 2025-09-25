// src/routers/administrador.router.js (VERSIÓN FINAL Y LIMPIA)
import express from "express";
import {
  registerAdmin,
  confirmEmail,
  loginAdmin,
  verifyOTP,
  getAllTickets,
  updateTicketDiagnosis,
  createTicketProforma,
  updateTicketStatus,
  getInvoiceXML,
  getInvoicePDF
} from "../controllers/administrador.controller.js"; // Asegúrate que el nombre del controlador coincida

import {
  authenticateJWT,
  requireAdminRole,
  protectFirstAdminCreation
} from "../middlewares/auth.middleware.js";

import {
  validateAdminCreation,
  validateLogin,
} from "../middlewares/validator.middleware.js";

const router = express.Router();

// --- RUTAS PÚBLICAS DE AUTENTICACIÓN ---
router.post("/register", protectFirstAdminCreation, validateAdminCreation, registerAdmin);
router.get("/confirm/:token", confirmEmail);
router.post("/login", validateLogin, loginAdmin);
router.post("/verify-otp", verifyOTP);

// --- RUTAS PROTEGIDAS PARA GESTIÓN DE TICKETS ---
// Se aplica primero el middleware de JWT y luego el de rol de admin
router.get("/tickets", authenticateJWT, requireAdminRole, getAllTickets);
router.post("/tickets/:ticketId/diagnose", authenticateJWT, requireAdminRole, updateTicketDiagnosis);
router.post("/tickets/:ticketId/proforma", authenticateJWT, requireAdminRole, createTicketProforma);
router.post("/tickets/:ticketId/status", authenticateJWT, requireAdminRole, updateTicketStatus);

// --- RUTAS PROTEGIDAS PARA FACTURACIÓN ---
router.get("/tickets/:ticketId/invoice/xml", authenticateJWT, requireAdminRole, getInvoiceXML);
router.get("/tickets/:ticketId/invoice/pdf", authenticateJWT, requireAdminRole, getInvoicePDF);

export default router;