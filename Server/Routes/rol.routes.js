import { Router } from "express";
import {
  createRol,
  findAllRoles,
  findRolById,
} from "../db/actions/rolActions.js";

const router = Router();

// Crear rol
router.post("/create", async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const result = await createRol({ nombre, descripcion });
    res.status(201).json({ message: "Rol creado correctamente", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los roles
router.get("/all", async (req, res) => {
  try {
    const result = await findAllRoles();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener rol por ID
router.get("/byId/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findRolById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
