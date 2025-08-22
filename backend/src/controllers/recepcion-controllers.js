import Equipo from "../models/Equipo.js";
import { v4 as uuidv4 } from "uuid"; // para generar número de orden único

// 1. Iniciar sesión (ejemplo simple, usando auth existente)
export const loginRecepcionista = (req, res) => {
  const { email } = req.body;
  res.json({ message: `Recepcionista ${email} ha iniciado sesión.` });
};

// 2. Registrar entrada de equipo
export const registrarEquipo = async (req, res) => {
  try {
    const { cliente, descripcion, numeroSerie } = req.body;
    const documentos = req.files?.documentos || [];
    const imagenes = req.files?.imagenes || [];

    const equipo = new Equipo({
      cliente,
      descripcion,
      numeroSerie,
      documentos,
      imagenes,
      numeroOrden: uuidv4(), // número de orden único
      estado: "Ingresado"
    });

    await equipo.save();
    res.status(201).json({ message: "Equipo registrado con éxito", equipo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Cambiar estado
export const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const equipo = await Equipo.findByIdAndUpdate(id, { estado }, { new: true });
    if (!equipo) return res.status(404).json({ error: "Equipo no encontrado" });

    res.json({ message: "Estado actualizado", equipo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Consultar listado
export const listarEquipos = async (req, res) => {
  try {
    const equipos = await Equipo.find();
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Generar reporte (ejemplo simple, puede ser PDF después)
export const generarReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const equipo = await Equipo.findById(id);
    if (!equipo) return res.status(404).json({ error: "Equipo no encontrado" });

    // Aquí podrías usar pdfkit, puppeteer o jsPDF
    res.json({
      reporte: {
        numeroOrden: equipo.numeroOrden,
        cliente: equipo.cliente,
        descripcion: equipo.descripcion,
        fechaIngreso: equipo.fechaIngreso,
        estado: equipo.estado
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Notificar área técnica (ejemplo simple)
export const notificarAreaTecnica = async (req, res) => {
  try {
    const { id } = req.params;
    const equipo = await Equipo.findById(id);
    if (!equipo) return res.status(404).json({ error: "Equipo no encontrado" });

    // Aquí podrías integrar correo (nodemailer) o sockets
    res.json({ message: `Área técnica notificada para el equipo ${equipo.numeroOrden}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7. Editar datos de ingreso
export const editarIngreso = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const equipo = await Equipo.findByIdAndUpdate(id, data, { new: true });
    if (!equipo) return res.status(404).json({ error: "Equipo no encontrado" });

    res.json({ message: "Ingreso editado correctamente", equipo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
