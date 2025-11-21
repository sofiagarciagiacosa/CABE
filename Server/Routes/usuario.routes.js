import { Router } from "express";
import {
  createUser,
  findAllUsers,
  findUserById,
  findUserByEmail,
} from "../db/actions/usuarioActions.js";

const router = Router();

// Crear usuario
router.post("/create", async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const result = await createUser({ nombre, email, password, rol });
    res.status(201).json({ message: "Usuario creado correctamente", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get("/all", async (req, res) => {
  try {
    const result = await findAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener usuario por ID
router.get("/byId/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await findUserById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener usuario por email
router.get("/byEmail/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const result = await findUserByEmail(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
