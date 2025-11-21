import { Router } from "express";
import {
  createUrgencia,
  findAllUrgencias,
  findUrgenciaById,
} from "../db/actions/urgenciaActions.js";

const router = Router();

// Crear urgencia
router.post("/create", async (req, res) => {
  const { nombre } = req.body;

  try {
    const result = await createUrgencia({ nombre });
    res.status(200).json({ message: "Urgencia creada con éxito", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las urgencias
router.get("/all", async (req, res) => {
  try {
    const result = await findAllUrgencias();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener urgencia por ID
router.get("/byId/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findUrgenciaById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
