import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  verifyOTP,
  confirmEmail // ¡Esta es la importación que faltaba!
} from "../controllers/administrador-controllers.js"; // Cambiado de AdminController.js a administrador-controllers.js

import {
  validateAdminCreation,
  validateAdminLogin,
  validateAdminId,
  validateAdminUpdate,
} from "../middlewares/validator.js"; // Asegúrate que la ruta sea correcta, si `validator.js` está en la misma carpeta que `AuthMiddleware.js`

// src/routers/administrador-router.js (CORREGIDO)
import {
  verificarTokenJWT,
  esAdministrador,
  protegerRutaCrearAdmin,
} from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/admin/register
 * @desc    Registrar nuevo administrador
 * @access  Público si no hay administradores, privado si ya existen
 */
router.post("/register", protegerRutaCrearAdmin, validateAdminCreation, registerAdmin);

/**
 * @route   GET /api/admin/confirm/:token
 * @desc    Confirmar el correo del administrador
 * @access  Público
 */
router.get("/confirm/:token", confirmEmail); // Agregado para la confirmación de correo

/**
 * @route   POST /api/admin/login
 * @desc    Login de administrador
 * @access  Público
 */
router.post("/login", validateAdminLogin, loginAdmin);

/**
 * @route   POST /api/admin/verify-otp
 * @desc    Verificar OTP y generar token JWT
 * @access  Público
 */
router.post("/verify-otp", verifyOTP);

/**
 * @route   GET /api/admin
 * @desc    Obtener todos los administradores
 * @access  Privado
 */
router.get("/", verificarTokenJWT, esAdministrador, getAdmins);

/**
 * @route   GET /api/admin/:id
 * @desc    Obtener administrador por ID
 * @access  Privado
 */
router.get("/:id", verificarTokenJWT, esAdministrador, validateAdminId, getAdminById);

/**
 * @route   PUT /api/admin/:id
 * @desc    Actualizar administrador
 * @access  Privado
 */
router.put("/:id", verificarTokenJWT, esAdministrador, validateAdminId, validateAdminUpdate, updateAdmin);

/**
 * @route   DELETE /api/admin/:id
 * @desc    Eliminar administrador
 * @access  Privado
 */
router.delete("/:id", verificarTokenJWT, esAdministrador, validateAdminId, deleteAdmin);

export default router;