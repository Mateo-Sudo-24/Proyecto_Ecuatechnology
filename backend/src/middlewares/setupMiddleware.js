import { PrismaClient } from "@prisma/client";
import { verificarTokenJWT } from "./JWT.js";
import { existeAdministrador } from "./AuthMiddleware.js"; // Asegúrate de tener este middleware
const prisma = new PrismaClient();

// Middleware para proteger la ruta de creación del primer administrador
export const protegerRutaCrearAdmin = async (req, res, next) => {
  try {
    const adminCount = await prisma.administrador.count();

    if (adminCount === 0) {
      // Si no hay administradores, permitir la creación del primero sin autenticación
      console.log("No hay administradores. Permitiendo la creación del primer administrador.");
      return next();
    } else {
      // Si ya existen administradores, requerir autenticación
      console.log("Ya existen administradores. La ruta requiere autenticación.");
      return verificarTokenJWT(req, res, () => existeAdministrador(req, res, next));
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error del servidor al verificar administradores." });
  }
};
