import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const usuarioSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // importante (no se devuelve nunca)
    },

    rol: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "rol",
    },

    
    bio: {
      type: String,
      maxlength: 300,
      default: "",
    },

    avatar: {
      type: String, // URL de imagen
      default: "",
    },

    activo: {
      type: Boolean,
      default: true,
    },

    puesto: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Usuario = models.usuario || model("usuario", usuarioSchema);

export default Usuario;
