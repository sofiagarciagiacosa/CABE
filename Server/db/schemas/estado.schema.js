import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const estadoSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Estado = models.estado || model("estado", estadoSchema);

export default Estado;
