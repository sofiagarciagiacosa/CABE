import Cliente from "../schemas/cliente.schema.js";

// Crear cliente
export const crearCliente = async (data) => {
  const cliente = new Cliente(data);
  return await cliente.save();
};

// Obtener todos
export const obtenerClientes = async () => {
  return await Cliente.find();
};

// Obtener por ID
export const obtenerClientePorId = async (id) => {
  return await Cliente.findById(id);
};

// Actualizar
export const actualizarCliente = async (id, data) => {
  return await Cliente.findByIdAndUpdate(id, data, { new: true });
};

// Eliminar
export const eliminarCliente = async (id) => {
  return await Cliente.findByIdAndDelete(id);
};
