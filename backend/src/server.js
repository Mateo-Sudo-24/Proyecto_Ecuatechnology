import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './database.js';
import administradorRouter from './routers/administrador-router.js';
import clienteRouter from './routers/cliente-router.js';

const app = express();
dotenv.config();

// Conexión a la base de datos
connection();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.json());

// Ruta base
app.get('/', (req, res) => {
  res.send("Server on");
});

// Rutas de administrador
app.use("/api/admin", administradorRouter);
app.use("/api/cliente", clienteRouter);

export default app;