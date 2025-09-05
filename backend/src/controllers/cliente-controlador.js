// controllers/cliente-controller.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMailToRegister, sendMailOTP } from "../config/nodemailer";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "ECUATECH_SECRET";

// Registrar Cliente
export const registerCliente = async (req, res) => {
  try {
    const { nombre, email, telefono, password } = req.body;

    const existe = await prisma.cliente.findUnique({ where: { email } });
    if (existe) return res.status(400).json({ message: "El cliente ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = Math.random().toString(36).slice(2);

    await sendMailToRegister(email, token);

    const cliente = await prisma.cliente.create({
      data: { nombre, email, telefono, password: hashedPassword, token },
    });

    // 🔹 Aquí insertas el cliente también en SQL Server
    // usando un microservicio o API puente.

    res.json({ message: "Cliente registrado con éxito, confirma tu correo.", cliente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Confirmar email
export const confirmEmailCliente = async (req, res) => {
  try {
    const { token } = req.params;
    const cliente = await prisma.cliente.findFirst({ where: { token } });
    if (!cliente) return res.status(400).json({ message: "Token inválido" });

    await prisma.cliente.update({
      where: { id: cliente.id },
      data: { confirmEmail: true, token: null },
    });

    res.json({ message: "Correo confirmado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login cliente con OTP
export const loginCliente = async (req, res) => {
  try {
    const { email, password } = req.body;

    const cliente = await prisma.cliente.findUnique({ where: { email } });
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
    if (!cliente.confirmEmail) return res.status(401).json({ message: "Confirma tu correo" });

    const isPasswordValid = await bcrypt.compare(password, cliente.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.cliente.update({
      where: { id: cliente.id },
      data: { otp, otpExpires },
    });

    await sendMailOTP(cliente.email, otp);

    res.json({ message: "OTP enviado al correo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verificar OTP
export const verifyOTPCliente = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const cliente = await prisma.cliente.findUnique({ where: { email } });
    if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });

    if (cliente.otp !== otp) return res.status(401).json({ message: "OTP inválido" });
    if (new Date() > cliente.otpExpires) return res.status(401).json({ message: "OTP expirado" });

    await prisma.cliente.update({
      where: { id: cliente.id },
      data: { otp: null, otpExpires: null },
    });

    const token = jwt.sign({ id: cliente.id, email: cliente.email }, SECRET, { expiresIn: "2h" });

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
