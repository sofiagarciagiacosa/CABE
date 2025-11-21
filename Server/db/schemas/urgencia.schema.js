import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const urgenciaSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Urgencia = models.urgencia || model("urgencia", urgenciaSchema);

export default Urgencia;
