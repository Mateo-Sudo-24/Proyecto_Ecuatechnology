// src/routers/cliente.router.js (VERSIÓN FINAL Y LIMPIA)
import express from "express";
import {
  registerCliente,
  confirmEmailCliente,
  loginCliente,
  verifyOTPCliente,
  createTicket,
  getClientTickets,
  processProforma,
  getClientInvoicePDF,
} from "../controllers/cliente-controller.js";

import {
  authenticateJWT,
  requireClientRole
} from "../middlewares/AuthMiddleware.js";

import {
  validateClienteCreation,
  validateLogin,
  validateTicketCreation
} from "../middlewares/validator.js";

const router = express.Router();

// --- RUTAS PÚBLICAS DE AUTENTICACIÓN ---
router.post("/register", validateClienteCreation, registerCliente);
router.get("/confirm/:token", confirmEmailCliente);
router.post("/login", validateLogin, loginCliente);
router.post("/verify-otp", verifyOTPCliente);

// --- RUTAS PROTEGIDAS (Requieren Token de Cliente) ---

// Crear y ver sus solicitudes de servicio (tickets)
router.post("/tickets", authenticateJWT, requireClientRole, validateTicketCreation, createTicket);
router.get("/tickets", authenticateJWT, requireClientRole, getClientTickets);

// Aprobar o Rechazar una proforma
router.post("/tickets/proforma", authenticateJWT, requireClientRole, processProforma);

// Descargar la factura de un ticket específico
router.get("/tickets/:ticketId/invoice", authenticateJWT, requireClientRole, getClientInvoicePDF);

export default router;