// controllers/administrador-controller.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "ECUATECH_SECRET"; // Usa variable de entorno

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existe = await prisma.administrador.findUnique({ where: { email } });
    if (existe) return res.status(400).json({ message: "El administrador ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.administrador.create({
      data: { email, password: hashedPassword },
    });

    res.json({ message: "Administrador registrado con éxito", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.administrador.findUnique({ where: { email } });
    if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET, { expiresIn: "2h" });

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await prisma.administrador.findMany();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await prisma.administrador.findUnique({ where: { id: Number(id) } });
    if (!admin) return res.status(404).json({ message: "No encontrado" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const data = {};
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);

    const admin = await prisma.administrador.update({
      where: { id: Number(id) },
      data,
    });

    res.json({ message: "Administrador actualizado", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.administrador.delete({ where: { id: Number(id) } });
    res.json({ message: "Administrador eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};