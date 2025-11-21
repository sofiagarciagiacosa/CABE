import { Router } from "express";
import {
  createTarea,
  findAllTareas,
  findTareaById,
} from "../db/actions/tareaActions.js";

const router = Router();

// Crear tarea
router.post("/create", async (req, res) => {
  try {
    const result = await createTarea(req.body);
    res.status(200).json({ message: "Tarea creada con éxito", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las tareas
router.get("/all", async (req, res) => {
  try {
    const result = await findAllTareas();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener tarea por ID
router.get("/byId/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findTareaById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
