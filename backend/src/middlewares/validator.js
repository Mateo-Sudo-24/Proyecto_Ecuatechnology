// middlewares/validators/validator.js (ubicación recomendada)
import { body, validationResult, param } from "express-validator";

/**
 * @function handleValidationErrors
 * @description Middleware que maneja los resultados de las validaciones de express-validator.
 *              Si hay errores, envía una respuesta 400.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Formatear los errores para una respuesta más limpia si es necesario
    const formattedErrors = errors.array().map(err => ({
      field: err.path, // 'param' para param, 'body' para body, etc.
      message: err.msg
    }));
    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

// -------------------------------------------------------------------------- //
//                       VALIDACIONES COMUNES REUTILIZABLES                   //
// -------------------------------------------------------------------------- //

const validateEmail = body("email")
  .isEmail().withMessage("Formato de correo electrónico inválido.")
  .normalizeEmail();

const validatePassword = body("password")
  .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
  .matches(/[A-Z]/).withMessage("La contraseña debe contener al menos una letra mayúscula.")
  .matches(/[a-z]/).withMessage("La contraseña debe contener al menos una letra minúscula.")
  .matches(/[0-9]/).withMessage("La contraseña debe contener al menos un número.")
  .matches(/[^A-Za-z0-9]/).withMessage("La contraseña debe contener al menos un carácter especial.");

const validateOptionalPassword = body("password")
  .optional() // Permite que el campo sea opcional
  .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
  .matches(/[A-Z]/).withMessage("La contraseña debe contener al menos una letra mayúscula.")
  .matches(/[a-z]/).withMessage("La contraseña debe contener al menos una letra minúscula.")
  .matches(/[0-9]/).withMessage("La contraseña debe contener al menos un número.")
  .matches(/[^A-Za-z0-9]/).withMessage("La contraseña debe contener al menos un carácter especial.");

const validatePhoneNumber = body("telefono")
  .optional()
  .isMobilePhone("any", { strictMode: false }) // "any" para cualquier país, strictMode false para más flexibilidad
  .withMessage("Número de teléfono inválido.");

const validatePositiveIntegerId = param("id")
  .isInt({ min: 1 }).withMessage("El ID debe ser un número entero positivo.");

// -------------------------------------------------------------------------- //
//                             VALIDACIONES ADMIN                             //
// -------------------------------------------------------------------------- //

export const validateAdminId = [
  validatePositiveIntegerId,
  handleValidationErrors,
];

export const validateAdminCreation = [
  validateEmail,
  validatePassword,
  handleValidationErrors,
];

export const validateAdminLogin = [
  validateEmail,
  body("password").notEmpty().withMessage("La contraseña es obligatoria para el inicio de sesión."),
  handleValidationErrors,
];

export const validateAdminUpdate = [
  body("email").optional().isEmail().withMessage("Formato de correo electrónico inválido.").normalizeEmail(),
  validateOptionalPassword, // Usar la validación opcional
  handleValidationErrors,
];

export const validateAdminPasswordChange = [
  body("passwordActual").notEmpty().withMessage("La contraseña actual es obligatoria."),
  body("passwordNuevo").custom((value, { req }) => {
    if (value === req.body.passwordActual) {
      throw new Error("La nueva contraseña no puede ser igual a la actual.");
    }
    return true;
  }),
  validatePassword.withMessage("La nueva contraseña no cumple con los requisitos de seguridad."), // Aplicar la validación de seguridad a la nueva contraseña
  handleValidationErrors,
];

// -------------------------------------------------------------------------- //
//                             VALIDACIONES CLIENTE                           //
// -------------------------------------------------------------------------- //

export const validateClienteId = [
  validatePositiveIntegerId,
  handleValidationErrors,
];

export const validateClienteCreation = [
  body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio."),
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  handleValidationErrors,
];

export const validateClienteLogin = [
  validateEmail,
  body("password").notEmpty().withMessage("La contraseña es obligatoria para el inicio de sesión."),
  handleValidationErrors,
];

export const validateClienteUpdate = [
  body("nombre").optional().trim().notEmpty().withMessage("El nombre no puede estar vacío."),
  body("email").optional().isEmail().withMessage("Formato de correo electrónico inválido.").normalizeEmail(),
  validatePhoneNumber,
  validateOptionalPassword, // Usar la validación opcional
  handleValidationErrors,
];