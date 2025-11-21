import { connectDB } from "../connection.js";
import ProyectoUsuario from "../schemas/proyectoUsuario.schema.js";

// Asignar usuario a proyecto
export const assignUserToProject = async ({ proyecto, usuario }) => {
  try {
    await connectDB();

    const res = await ProyectoUsuario.create({
      proyecto,
      usuario,
    });

    return res;
  } catch (error) {
    throw new Error("Error al asignar usuario al proyecto: " + error.message);
  }
};

// Traer todas las relaciones
export const findAllRelations = async () => {
  try {
    await connectDB();

    const res = await ProyectoUsuario.find()
      .populate("proyecto")
      .populate("usuario");

    return res;
  } catch (error) {
    throw new Error("Error al obtener relaciones: " + error.message);
  }
};

// Traer responsables por proyecto
export const findUsersByProject = async (proyectoId) => {
  try {
    await connectDB();

    const res = await ProyectoUsuario.find({ proyecto: proyectoId }).populate(
      "usuario"
    );

    return res;
  } catch (error) {
    throw new Error("Error al buscar responsables: " + error.message);
  }
};
