// server.js (VERSIÓN CORREGIDA Y MEJORADA)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { prisma } from './database.js'; // Importamos la instancia de prisma

// --- Importar Rutas ---
import administradorRouter from './routers/administrador.router.js';
import clienteRouter from './routers/cliente.router.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

// --- Configuraciones Principales ---
app.set('port', process.env.PORT || 4000);

// --- Middlewares Esenciales ---
// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors({
  origin: process.env.URL_FRONTEND || 'http://localhost:5173', // Puerto por defecto de Vite/React
  credentials: true
}));

// Permitir que el servidor entienda JSON
app.use(express.json());

// --- Rutas de la API ---
app.get('/api', (req, res) => {
  res.json({ message: "Bienvenido a la API de Ecuatechnology para el Portal Web." });
});

// Usar los routers para las rutas específicas
app.use("/api/admin", administradorRouter);
app.use("/api/clientes", clienteRouter); // Usamos el plural "clientes" por convención

// --- Manejo de Errores Centralizado ---
// Este middleware se activa si ocurre un error en cualquier ruta anterior
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ha ocurrido un error inesperado en el servidor.' });
});

export default app;