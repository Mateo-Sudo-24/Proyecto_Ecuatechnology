import express from "express";
import {
  loginRecepcionista,
  registrarEquipo,
  cambiarEstado,
  listarEquipos,
  generarReporte,
  notificarAreaTecnica,
  editarIngreso
} from "../controllers/recepcion-controller.js";
import {
  validateLogin,
  validateMongoId
} from "../middlewares/validators.js";

const router = express.Router();

// Login
router.post("/login", validateLogin, loginRecepcionista);

// Registro de equipo
router.post("/equipos", registrarEquipo);

// Cambiar estado
router.put("/equipos/:id/estado", validateMongoId, cambiarEstado);

// Listar
router.get("/equipos", listarEquipos);

// Generar reporte
router.get("/equipos/:id/reporte", validateMongoId, generarReporte);

// Notificar área técnica
router.post("/equipos/:id/notificar", validateMongoId, notificarAreaTecnica);

// Editar ingreso
router.put("/equipos/:id", validateMongoId, editarIngreso);

export default router;
