import mongoose from "mongoose";

const { Schema, models, model, ObjectId } = mongoose;

const proyectoUsuarioSchema = new Schema(
  {
    proyecto: { type: ObjectId, ref: "proyecto", required: true },
    usuario: { type: ObjectId, ref: "usuario", required: true },
  },
  {
    timestamps: true,
  }
);

// Evitar duplicados del mismo usuario en el mismo proyecto
proyectoUsuarioSchema.index({ proyecto: 1, usuario: 1 }, { unique: true });

const ProyectoUsuario =
  models.proyectoUsuario || model("proyectoUsuario", proyectoUsuarioSchema);

export default ProyectoUsuario;
