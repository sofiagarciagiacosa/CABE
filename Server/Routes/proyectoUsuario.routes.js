import { Router } from "express";
import {
  assignUserToProject,
  findAllRelations,
  findUsersByProject,
  deleteByProject,
  createMany,
} from "../db/actions/proyectoUsuarioActions.js";

const router = Router();

// Asignar usuario a proyecto
router.post("/assign", async (req, res) => {
  const { proyecto, usuario } = req.body;

  try {
    const result = await assignUserToProject({ proyecto, usuario });
    res.status(201).json({ message: "Usuario asignado al proyecto", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ver todas las relaciones
router.get("/all", async (req, res) => {
  try {
    const result = await findAllRelations();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ver responsables de un proyecto
router.get("/byProject/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findUsersByProject(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/updateByProject/:id", async (req, res) => {
  const projectId = req.params.id;
  const { usuarios } = req.body;

  try {
    await deleteByProject(projectId); // borrás relaciones actuales
    await createMany(projectId, usuarios); // creás las nuevas

    res.json({ message: "Responsables actualizados" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
