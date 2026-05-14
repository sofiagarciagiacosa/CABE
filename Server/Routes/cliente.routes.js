import express from "express";

import {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
} from "../db/actions/clienteActions.js";

const router = express.Router();

// =========================
// CREAR
// =========================

router.post("/", async (req, res) => {
  try {
    const cliente = await crearCliente(req.body);

    res.status(201).json(cliente);
  } catch (error) {
    // EMAIL DUPLICADO

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Ya existe un cliente registrado con ese email",
      });
    }

    // VALIDACIONES MONGOOSE

    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Datos inválidos",
      });
    }

    // ERROR GENERAL

    res.status(500).json({
      error: "Error al crear cliente",
    });
  }
});

// =========================
// LISTAR TODOS
// =========================

router.get("/", async (req, res) => {
  try {
    const clientes = await obtenerClientes();

    res.json(clientes);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener clientes",
    });
  }
});

// =========================
// OBTENER POR ID
// =========================

router.get("/:id", async (req, res) => {
  try {
    const cliente = await obtenerClientePorId(req.params.id);

    if (!cliente) {
      return res.status(404).json({
        error: "Cliente no encontrado",
      });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener cliente",
    });
  }
});

// =========================
// ACTUALIZAR
// =========================

router.put("/:id", async (req, res) => {
  try {
    const cliente = await actualizarCliente(req.params.id, req.body);

    if (!cliente) {
      return res.status(404).json({
        error: "Cliente no encontrado",
      });
    }

    res.json(cliente);
  } catch (error) {
    // EMAIL DUPLICADO

    if (error.code === 11000) {
      return res.status(400).json({
        error: "Ese email ya pertenece a otro cliente",
      });
    }

    // VALIDACIONES

    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Datos inválidos",
      });
    }

    res.status(500).json({
      error: "Error al actualizar cliente",
    });
  }
});

// =========================
// ELIMINAR
// =========================

router.delete("/:id", async (req, res) => {
  try {
    const cliente = await eliminarCliente(req.params.id);

    if (!cliente) {
      return res.status(404).json({
        error: "Cliente no encontrado",
      });
    }

    res.json({
      mensaje: "Cliente eliminado",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar cliente",
    });
  }
});

export default router;
