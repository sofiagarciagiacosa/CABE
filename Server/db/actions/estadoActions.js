import { connectDB } from "../connection.js";
import Estado from "../schemas/estado.schema.js";

export const createEstado = async ({ nombre }) => {
  try {
    await connectDB();
    const res = await Estado.create({ nombre });
    return res;
  } catch (error) {
    throw new Error("Error al crear el estado: " + error.message);
  }
};

export const findAllEstados = async () => {
  try {
    await connectDB();
    const res = await Estado.find();
    return res;
  } catch (error) {
    throw new Error("Error al buscar estados: " + error.message);
  }
};

export const findEstadoById = async (id) => {
  try {
    await connectDB();
    const res = await Estado.findById(id);
    return res;
  } catch (error) {
    throw new Error("Error al buscar estado: " + error.message);
  }
};
