import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "../controllers/AdminController.js";

import {
  validateAdminCreation,
  validateAdminLogin,
  validateAdminId,
  validateAdminUpdate,
} from "../middlewares/validators/AdminValidator.js";

import {
  verificarTokenJWT,
  existeAdministrador,
  protegerRutaCrearAdmin,
} from "../middlewares/AuthAdminMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/admin/register
 * @desc    Registrar nuevo administrador
 * @access  Público si no hay administradores, privado si ya existen
 */
router.post("/register", protegerRutaCrearAdmin, validateAdminCreation, registerAdmin);

/**
 * @route   POST /api/admin/login
 * @desc    Login de administrador
 * @access  Público
 */
router.post("/login", validateAdminLogin, loginAdmin);

/**
 * @route   GET /api/admin
 * @desc    Obtener todos los administradores
 * @access  Privado
 */
router.get("/", verificarTokenJWT, existeAdministrador, getAdmins);

/**
 * @route   GET /api/admin/:id
 * @desc    Obtener administrador por ID
 * @access  Privado
 */
router.get("/:id", verificarTokenJWT, existeAdministrador, validateAdminId, getAdminById);

/**
 * @route   PUT /api/admin/:id
 * @desc    Actualizar administrador
 * @access  Privado
 */
router.put("/:id", verificarTokenJWT, existeAdministrador, validateAdminId, validateAdminUpdate, updateAdmin);

/**
 * @route   DELETE /api/admin/:id
 * @desc    Eliminar administrador
 * @access  Privado
 */
router.delete("/:id", verificarTokenJWT, existeAdministrador, validateAdminId, deleteAdmin);

export default router;