import express from "express";
import {
  registerCliente,
  confirmEmailCliente,
  loginCliente,
  verifyOTPCliente,
} from "../controllers/cliente-controller.js";

import {
  validateClienteCreation,
  validateClienteLogin,
} from "../middlewares/validator.js";

const router = express.Router();

/**
 * @route   POST /api/clientes/register
 * @desc    Registrar un nuevo cliente
 * @access  Público
 */
router.post("/register", validateClienteCreation, registerCliente);

/**
 * @route   GET /api/clientes/confirm/:token
 * @desc    Confirmar el correo del cliente
 * @access  Público
 */
router.get("/confirm/:token", confirmEmailCliente);

/**
 * @route   POST /api/clientes/login
 * @desc    Login de cliente (genera OTP)
 * @access  Público
 */
router.post("/login", validateClienteLogin, loginCliente);

/**
 * @route   POST /api/clientes/verify-otp
 * @desc    Verificar OTP y generar JWT
 * @access  Público
 */
router.post("/verify-otp", verifyOTPCliente);

export default router;
