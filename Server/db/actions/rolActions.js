import { connectDB } from "../connection.js";
import Rol from "../schemas/rol.schema.js";

// Crear rol
export const createRol = async ({ nombre, descripcion }) => {
  try {
    await connectDB();

    const res = await Rol.create({
      nombre,
      descripcion,
    });

    return res;
  } catch (error) {
    throw new Error("Error al crear el rol: " + error.message);
  }
};

// Traer todos los roles
export const findAllRoles = async () => {
  try {
    await connectDB();
    const res = await Rol.find();
    return res;
  } catch (error) {
    throw new Error("Error al obtener roles: " + error.message);
  }
};

// Traer rol por ID
export const findRolById = async (id) => {
  try {
    await connectDB();
    const res = await Rol.findById(id);
    return res;
  } catch (error) {
    throw new Error("Error al buscar rol: " + error.message);
  }
};
