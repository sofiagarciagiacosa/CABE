import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const usuarioSchema = new Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: Schema.Types.ObjectId, required: true, ref: "rol" },
  },
  {
    timestamps: true,
  }
);

const Usuario = models.usuario || model("usuario", usuarioSchema);

export default Usuario;
