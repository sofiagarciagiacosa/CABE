import express from "express";
import {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
} from "../db/actions/clienteActions.js";

const router = express.Router();

// Crear
router.post("/", async (req, res) => {
  try {
    const cliente = await crearCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos
router.get("/", async (req, res) => {
  try {
    const clientes = await obtenerClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener por ID
router.get("/:id", async (req, res) => {
  try {
    const cliente = await obtenerClientePorId(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const cliente = await actualizarCliente(req.params.id, req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await eliminarCliente(req.params.id);
    res.json({ mensaje: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
