import mongoose from "mongoose";

const contactoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    telefono: {
      type: String,
      trim: true,
    },

    cargo: {
      type: String,
      trim: true,
    },

    principal: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const interaccionSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      enum: [
        "Llamada",
        "Email",
        "Reunión",
        "WhatsApp",
        "Presupuesto",
        "Seguimiento",
        "Otro",
      ],
      default: "Otro",
    },

    descripcion: {
      type: String,
      required: true,
      trim: true,
    },

    fecha: {
      type: Date,
      default: Date.now,
    },

    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuario",
    },
  },
  {
    timestamps: true,
  },
);

const clienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    telefono: {
      type: String,
      trim: true,
    },

    direccion: {
      type: String,
      trim: true,
    },

    pais: {
      type: String,
      trim: true,
    },

    provincia: {
      type: String,
      trim: true,
    },

    ciudad: {
      type: String,
      trim: true,
    },

    sitioWeb: {
      type: String,
      trim: true,
    },

    rubro: {
      type: String,
      enum: [
        "Tecnología",
        "Salud",
        "Educación",
        "E-commerce",
        "Gastronomía",
        "Moda",
        "Marketing",
        "Inmobiliaria",
        "Otro",
      ],
      default: "Otro",
    },

    estado: {
      type: String,
      enum: [
        "Prospecto",
        "Contactado",
        "Cliente Activo",
        "Proyecto en Pausa",
        "Finalizado",
        "Archivado",
      ],
      default: "Prospecto",
    },

    prioridad: {
      type: String,
      enum: ["Alta", "Media", "Baja"],
      default: "Media",
    },

    descripcion: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
    },
    redes: {
      instagram: {
        type: String,
        trim: true,
      },

      facebook: {
        type: String,
        trim: true,
      },

      linkedin: {
        type: String,
        trim: true,
      },

      tiktok: {
        type: String,
        trim: true,
      },
    },

    contactos: [contactoSchema],

    interacciones: [interaccionSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
clienteSchema.virtual("proyectos", {
  ref: "proyecto",
  localField: "_id",
  foreignField: "cliente",
});


export default mongoose.model("Cliente", clienteSchema);
