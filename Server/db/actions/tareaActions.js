import { connectDB } from "../connection.js";
import Tarea from "../schemas/tarea.schema.js";

export const createTarea = async (data) => {
  try {
    await connectDB();
    const res = await Tarea.create(data);
    return res;
  } catch (error) {
    throw new Error("Error al crear la tarea: " + error.message);
  }
};

export const findAllTareas = async () => {
  try {
    await connectDB();
    const res = await Tarea.find()
      .populate("idProyecto")
      .populate("idUsuario")
      .populate("idEstado")
      .populate("idUrgencia");

    return res;
  } catch (error) {
    throw new Error("Error al buscar tareas: " + error.message);
  }
};

export const findTareaById = async (id) => {
  try {
    await connectDB();
    const res = await Tarea.findById(id)
      .populate("idProyecto")
      .populate("idUsuario")
      .populate("idEstado")
      .populate("idUrgencia");

    return res;
  } catch (error) {
    throw new Error("Error al buscar tarea: " + error.message);
  }
};
