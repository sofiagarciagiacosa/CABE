import { connectDB } from "../connection.js";
import Usuario from "../schemas/usuario.schema.js";

// Crear usuario
export const createUser = async ({ nombre, email, password, rol }) => {
  try {
    await connectDB();

    const res = await Usuario.create({
      nombre,
      email,
      password,
      rol,
    });

    return res;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
};

// Traer todos los usuarios
export const findAllUsers = async () => {
  try {
    await connectDB();
    const res = await Usuario.find().populate({ path: "rol" });
    return res;
  } catch (error) {
    throw new Error("Error al obtener usuarios: " + error.message);
  }
};

// Traer usuario por ID
export const findUserById = async (id) => {
  try {
    await connectDB();
    const res = await Usuario.findById(id).populate("rol");
    return res;
  } catch (error) {
    throw new Error("Error al buscar usuario: " + error.message);
  }
};

// Traer usuario por email
export const findUserByEmail = async (email) => {
  try {
    await connectDB();
    const res = await Usuario.findOne({ email });
    return res;
  } catch (error) {
    throw new Error("Error al buscar usuario por email: " + error.message);
  }
};
