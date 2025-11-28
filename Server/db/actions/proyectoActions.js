import { connectDB } from "../connection.js";
import Proyecto from "../schemas/proyecto.schema.js";
import ProyectoUsuario from "../schemas/proyectoUsuario.schema.js";
import Tarea from "../schemas/tarea.schema.js";


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
    const res = await Proyecto.find(); // 👈 sin populate
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

export const findAllWithDetails = async () => {
  await connectDB();

  const proyectos = await Proyecto.find().populate("cliente");

  const proyectosConResponsables = await Promise.all(
    proyectos.map(async (proy) => {
      const responsables = await ProyectoUsuario.find({
        proyecto: proy._id,
      }).populate("usuario");

      return {
        ...proy.toObject(),
        responsables: responsables.map((r) => r.usuario),
      };
    })
  );

  return proyectosConResponsables;
};
export const updateProy = async (id, data) => {
  try {
    await connectDB();
    const res = await Proyecto.findByIdAndUpdate(id, data, { new: true });
    return res;
  } catch (error) {
    throw new Error("Error al actualizar el proyecto: " + error.message);
  }
};

export const deleteProy = async (id) => {
  try {
    await connectDB();

    // 1. Borrar relaciones con usuarios
    await ProyectoUsuario.deleteMany({ proyecto: id });

    // 2. Borrar tareas relacionadas
    await Tarea.deleteMany({ idProyecto: id });

    // 3. Finalmente borrar el proyecto
    const res = await Proyecto.findByIdAndDelete(id);
    return res;
  } catch (error) {
    throw new Error("Error al eliminar proyecto: " + error.message);
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