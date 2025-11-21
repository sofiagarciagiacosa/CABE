import { connectDB } from "../connection.js";
import Proyecto from "../schemas/proyecto.schema.js";

export const createProy = async ({
  nombre,
  descripcion,
  presupuesto,
  fechaInicio,
  fechaLimite,
  cliente,
}) => {
  try {
    await connectDB();
    const res = await Proyecto.create({
      nombre,
      descripcion,
      presupuesto,
      fechaInicio,
      fechaLimite,
      cliente,
    });
    console.log(res);
    return res; // si solo querés devolverlo tal cual
  } catch (error) {
    throw new Error("Error al crear el proyecto: " + error.message);
  }
};

export const findAll = async () => {
  try {
    await connectDB();
    const res = await Proyecto.find().populate({ path: "cliente" });
    return res;
  } catch (error) {
    throw new Error("Error al buscar proyectos: " + error.message);
  }
  
};


export const findById = async (id) => {
  try {
    await connectDB();
    const res = await Proyecto.findById(id).populate("cliente");
    return res;
  } catch (error) {
    throw new Error("Error al buscar proyecto: " + error.message);
  }
};
  
/*

export const findByClient = async (client) => {
  try {
    await connectDB();
    const res = await Proyecto.find({ client: client }).populate({
      path: "client",
    });
    return res;
  } catch (error) {}
};
*/