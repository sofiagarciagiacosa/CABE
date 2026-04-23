import { connectDB } from "../connection.js";
import Usuario from "../schemas/usuario.schema.js";
import bcrypt from "bcrypt";

// Crear usuario
export const createUser = async (data) => {
  const { nombre, apellido, email, password, rol, bio, avatar, puesto } = data;

  try {
    await connectDB();

    const exists = await Usuario.findOne({ email });
    if (exists) {
      throw new Error("El email ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Usuario.create({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      rol,
      bio,
      avatar,
      puesto,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Traer todos los usuarios
export const findAllUsers = async () => {
  try {
    await connectDB();

    return await Usuario.find()
      .select("-password") //  extra seguridad
      .populate("rol");
  } catch (error) {
    throw new Error(error.message);
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
// editar usuario - admin
export const updateUserByAdmin = async (id, data) => {
  try {
    await connectDB();

    return await Usuario.findByIdAndUpdate(id, data, { new: true }).select(
      "-password",
    );
  } catch (error) {
    throw new Error(error.message);
  }
};
// editar perfil propio
export const updateMyProfile = async (id, data) => {
  try {
    await connectDB();

    // solo ciertos campos
    const allowedFields = ["nombre", "apellido", "bio", "avatar", "password"];

    const updateData = {};
    for (let key of allowedFields) {
      if (data[key]) updateData[key] = data[key];
    }

    // hash si cambia password
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return await Usuario.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");
  } catch (error) {
    throw new Error(error.message);
  }
};