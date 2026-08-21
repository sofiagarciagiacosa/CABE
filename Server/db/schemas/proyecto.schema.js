import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const proyectoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    presupuesto: { type: Number, required: true },
    fechaInicio: { type: Date },
    fechaLimite: { type: Date },
    cliente: { type: Schema.Types.ObjectId, required: true, ref: "Cliente" },
    estado: {
      type: String,
      enum: [
        "Planificado",
        "En progreso",
        "En revisión",
        "Pausado",
        "Finalizado",
        "Cancelado",
      ],
      default: "Planificado",
    },
    tipoServicio: {
      type: String,
      enum: [
        "Estrategia y construcción de marca",
        "Branding y desarrollo visual",
        "Creación de contenido",
        "Dirección creativa y producción",
        "Acompañamiento y consultoría",
      ],
    },
    prioridad: {
      type: String,
      enum: ["Alta", "Media", "Baja"],
      default: "Media",
    },
    fechaFinalizacion: Date,
    progreso: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  },
);

const Proyecto = models.proyecto || model("proyecto", proyectoSchema);

export default Proyecto;
