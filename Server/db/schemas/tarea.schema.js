import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const tareaSchema = new Schema(
  {
    descripcion: { type: String, required: true },

    idProyecto: {
      type: Schema.Types.ObjectId,
      ref: "proyecto",
      required: true,
    },

    idUsuario: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: false,
    },

    idEstado: {
      type: Schema.Types.ObjectId,
      ref: "estado",
      required: true,
    },

    idUrgencia: {
      type: Schema.Types.ObjectId,
      ref: "urgencia",
      required: false,
    },

    fechaInicio: {
      type: Date,
      required: false,
    },

    fechaLimite: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Tarea = models.tarea || model("tarea", tareaSchema);

export default Tarea;
