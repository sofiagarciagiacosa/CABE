import { connectDB } from "../connection.js";
import Urgencia from "../schemas/urgencia.schema.js";

export const createUrgencia = async ({ nombre }) => {
  try {
    await connectDB();
    const res = await Urgencia.create({ nombre });
    return res;
  } catch (error) {
    throw new Error("Error al crear la urgencia: " + error.message);
  }
};

export const findAllUrgencias = async () => {
  try {
    await connectDB();
    const res = await Urgencia.find();
    return res;
  } catch (error) {
    throw new Error("Error al buscar urgencias: " + error.message);
  }
};

export const findUrgenciaById = async (id) => {
  try {
    await connectDB();
    const res = await Urgencia.findById(id);
    return res;
  } catch (error) {
    throw new Error("Error al buscar urgencia: " + error.message);
  }
};
