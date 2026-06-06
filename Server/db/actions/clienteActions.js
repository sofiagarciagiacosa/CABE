import Cliente from "../schemas/cliente.schema.js";
import Tarea from "../schemas/tarea.schema.js";
// Crear cliente
export const crearCliente = async (data) => {
  const cliente = new Cliente(data);
  return await cliente.save();
};

// Obtener todos
export const obtenerClientes = async () => {
  return await Cliente.find().populate("proyectos").sort({ createdAt: -1 });
};

// Obtener por ID
export const obtenerClientePorId = async (id) => {
  const cliente = await Cliente.findById(id)

    .populate("proyectos")

    .populate("interacciones.usuario", "nombre apellido avatar")

    .populate("interacciones.proyecto", "nombre");

  if (!cliente) return null;

  // enriquecer proyectos con tareas
  const proyectosConStats = await Promise.all(
    cliente.proyectos.map(async (proyecto) => {
      const tareas = await Tarea.find({
        idProyecto: proyecto._id,
      }).populate("idEstado");

      const porHacer = tareas.filter(
        (tarea) => tarea.idEstado?.nombre === "Por hacer",
      ).length;

      return {
        ...proyecto.toObject(),

        stats: {
          totalTareas: tareas.length,

          porHacer,
        },
      };
    }),
  );

  cliente.proyectos = proyectosConStats;

  return cliente;
};

// Actualizar
export const actualizarCliente = async (id, data) => {
  return await Cliente.findByIdAndUpdate(id, data, { new: true })

    .populate("proyectos")

    .populate({
      path: "interacciones.usuario",

      select: "nombre apellido avatar puesto",
    })

    .populate({
      path: "interacciones.proyecto",

      select: "nombre",
    });
};

// Eliminar
export const eliminarCliente = async (id) => {
  return await Cliente.findByIdAndDelete(id);
};
