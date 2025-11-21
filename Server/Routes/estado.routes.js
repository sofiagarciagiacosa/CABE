import { Router } from "express";
import {
  createEstado,
  findAllEstados,
  findEstadoById,
} from "../db/actions/estadoActions.js";

const router = Router();

// Crear estado
router.post("/create", async (req, res) => {
  const { nombre } = req.body;

  try {
    const result = await createEstado({ nombre });
    res.status(200).json({ message: "Estado creado con éxito", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los estados
router.get("/all", async (req, res) => {
  try {
    const result = await findAllEstados();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener estado por ID
router.get("/byId/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findEstadoById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
