import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const rolSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Rol = models.rol || model("rol", rolSchema);

export default Rol;
