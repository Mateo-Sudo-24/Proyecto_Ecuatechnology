import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "ECUATECH_SECRET";

// ✅ Verifica el token JWT y extrae el usuario
export const verificarTokenJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded; // Guarda el payload del token
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o expirado." });
  }
};

// ✅ Verifica si el administrador existe en la base de datos
export const existeAdministrador = async (req, res, next) => {
  try {
    const { id } = req.usuario;

    const admin = await prisma.administrador.findUnique({ where: { id } });
    if (!admin) {
      return res.status(401).json({ msg: "Administrador no válido o no encontrado." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Error al verificar el administrador." });
  }
};

// ✅ Protege la ruta de creación del primer administrador
export const protegerRutaCrearAdmin = async (req, res, next) => {
  try {
    const adminCount = await prisma.administrador.count();

    if (adminCount === 0) {
      console.log("No hay administradores. Permitiendo la creación del primero.");
      return next();
    } else {
      console.log("Ya existen administradores. La ruta requiere autenticación.");
      return verificarTokenJWT(req, res, () => existeAdministrador(req, res, next));
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error del servidor al verificar administradores." });
  }
};