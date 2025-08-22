import { Schema, model } from "mongoose";

const equipoSchema = new Schema({
  cliente: { 
    type: String, 
    required: true },
  descripcion: { 
    type: String, 
    required: true },
  numeroSerie: { 
    type: String, 
    required: true },
  fechaIngreso: { 
    type: Date, 
    default: Date.now },
  documentos: [{ type: String }], // rutas de archivos o links
  imagenes: [{ type: String }],
  numeroOrden: { 
    type: String, 
    unique: true },
  estado: { type: String, 
    enum: ["Ingresado", "En revisión"], 
    default: "Ingresado" },
});

export default model("Equipo", equipoSchema);
