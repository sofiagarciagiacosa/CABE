import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const proyectoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    presupuesto: { type: Number, required: true },
    fechaInicio: { type: Date },
    fechaLimite: { type: Date },
    cliente: { type: Schema.Types.ObjectId, required: true, ref: "cliente" },
  },
  {
    timestamps: true,
  }
);

const Proyecto = models.proyecto || model("proyecto", proyectoSchema);

export default Proyecto;
