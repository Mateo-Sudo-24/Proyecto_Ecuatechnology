// middlewares/AuthMiddleware.js
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "ECUATECH_SECRET"; // Siempre usa variables de entorno

/**
 * @function verificarTokenJWT
 * @description Middleware para verificar la validez de un token JWT.
 *              Extrae el payload del token y lo adjunta a `req.usuario`.
 */
export const verificarTokenJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded; // Adjunta el payload del token (id, email)
    next();
  } catch (error) {
    console.error("Error al verificar token JWT:", error.message);
    return res.status(401).json({ msg: "Token inválido o expirado." });
  }
};

/**
 * @function existeAdministrador
 * @description Middleware para verificar si el usuario autenticado (desde JWT) es un administrador válido.
 *              Debe ser usado DESPUÉS de `verificarTokenJWT`.
 */
export const esAdministrador = async (req, res, next) => {
  if (!req.usuario || !req.usuario.id) {
    return res.status(401).json({ msg: "Usuario no autenticado para verificar rol de administrador." });
  }
  try {
    const { id } = req.usuario;
    const admin = await prisma.administrador.findUnique({ where: { id } });

    if (!admin) {
      return res.status(403).json({ msg: "Acceso denegado. Se requiere rol de Administrador." });
    }
    // Opcional: Adjuntar el objeto completo del administrador a la solicitud si se necesita más adelante
    req.admin = admin;
    next();
  } catch (error) {
    console.error("Error al verificar rol de administrador:", error.message);
    return res.status(500).json({ msg: "Error del servidor al verificar rol de administrador." });
  }
};

/**
 * @function esCliente
 * @description Middleware para verificar si el usuario autenticado (desde JWT) es un cliente válido.
 *              Debe ser usado DESPUÉS de `verificarTokenJWT`.
 */
export const esCliente = async (req, res, next) => {
  if (!req.usuario || !req.usuario.id) {
    return res.status(401).json({ msg: "Usuario no autenticado para verificar rol de cliente." });
  }
  try {
    const { id } = req.usuario;
    const cliente = await prisma.cliente.findUnique({ where: { id } });

    if (!cliente) {
      return res.status(403).json({ msg: "Acceso denegado. Se requiere rol de Cliente." });
    }
    // Opcional: Adjuntar el objeto completo del cliente a la solicitud
    req.cliente = cliente;
    next();
  } catch (error) {
    console.error("Error al verificar rol de cliente:", error.message);
    return res.status(500).json({ msg: "Error del servidor al verificar rol de cliente." });
  }
};

/**
 * @function protegerRutaCrearAdmin
 * @description Middleware para permitir la creación del primer administrador sin autenticación.
 *              Si ya existe al menos un administrador, requiere autenticación JWT.
 */
export const protegerRutaCrearAdmin = async (req, res, next) => {
  try {
    const adminCount = await prisma.administrador.count();

    if (adminCount === 0) {
      console.log("No hay administradores. Permitiendo la creación del primer administrador.");
      return next(); // Permitir sin token
    } else {
      console.log("Ya existen administradores. La ruta requiere autenticación.");
      // Si ya existen, aplicar la verificación JWT y luego el rol de administrador
      return verificarTokenJWT(req, res, () => esAdministrador(req, res, next));
    }
  } catch (error) {
    console.error("Error en protegerRutaCrearAdmin:", error.message);
    return res.status(500).json({ msg: "Error del servidor al verificar administradores existentes." });
  }
};