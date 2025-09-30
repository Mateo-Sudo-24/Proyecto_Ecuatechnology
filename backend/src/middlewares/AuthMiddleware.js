import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "ECUATECH_SECRET";

/**
 * Middleware para verificar la validez de un token JWT.
 * Si es válido, adjunta el payload del token a `req.auth`.
 */
export const authenticateJWT = (req, res, next) => {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
     return res.status(401).json({ error: 'Acceso no autorizado. Se requiere un token.' });
   }

   const token = authHeader.split(' ')[1];
   try {
     req.auth = jwt.verify(token, SECRET); // Adjunta payload como { adminId, type: 'admin' }
     next();
   } catch (err) {
     return res.status(403).json({ error: 'Token inválido o expirado.' });
   }
};

/**
 * Middleware para verificar que el usuario autenticado es un Administrador.
 * Debe usarse DESPUÉS de `authenticateJWT`.
 */
export const requireAdminRole = (req, res, next) => {
    if (req.auth && req.auth.type === 'admin') {
        return next();
    }
    res.status(403).json({ error: "Acceso denegado. Se requiere rol de administrador." });
};

/**
 * Middleware para verificar que el usuario autenticado es un Cliente.
 * Debe usarse DESPUÉS de `authenticateJWT`.
 */
export const requireClientRole = (req, res, next) => {
    if (req.auth && req.auth.type === 'cliente') {
        return next();
    }
    res.status(403).json({ error: "Acceso denegado. Se requiere rol de cliente." });
};

/**
 * Middleware especial para proteger la creación del primer administrador.
 * Si no hay admins, permite el paso. Si ya hay, requiere autenticación de admin.
 */
export const protectFirstAdminCreation = async (req, res, next) => {
  try {
    const adminCount = await prisma.administrador.count();
    if (adminCount === 0) {
      return next(); // No hay admins, se permite crear el primero.
    }
    // Si ya existen, se encadenan los middlewares de autenticación y rol.
    authenticateJWT(req, res, () => requireAdminRole(req, res, next));
  } catch (error) {
    res.status(500).json({ error: "Error del servidor al verificar administradores." });
  }
};