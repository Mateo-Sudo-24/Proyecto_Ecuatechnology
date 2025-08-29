// middlewares/validators/AdminValidator.js
import { body, validationResult, param } from "express-validator";

// Manejo de errores
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validaciones comunes
const validateEmail = body("email").isEmail().withMessage("Correo inválido.").normalizeEmail();
const validatePassword = body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.");

// Validaciones específicas
export const validateAdminId = [
  param("id").isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo."),
  handleValidationErrors,
];

export const validateAdminCreation = [
  validateEmail,
  validatePassword,
  handleValidationErrors,
];

export const validateAdminLogin = [
  validateEmail,
  body("password").notEmpty().withMessage("La contraseña es obligatoria."),
  handleValidationErrors,
];

export const validateAdminUpdate = [
  body("email").optional().isEmail().withMessage("Correo inválido.").normalizeEmail(),
  body("password").optional().isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres."),
  handleValidationErrors,
];

export const validateAdminPasswordChange = [
  body("passwordActual").notEmpty().withMessage("La contraseña actual es obligatoria."),
  body("passwordNuevo").isLength({ min: 8 }).withMessage("La nueva contraseña debe tener al menos 8 caracteres."),
  handleValidationErrors,
];
