import { Router } from "express";
import {
  createUser,
  findAllUsers,
  findUserById,
} from "../db/actions/usuarioActions.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();



//  SOLO ADMIN puede crear usuarios
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req, res) => {
    const { nombre, apellido, email, password, rol } = req.body;

    try {
      const result = await createUser({ nombre, apellido, email, password, rol });
      res.status(201).json({ message: "Usuario creado correctamente", result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//  SOLO ADMIN puede ver todos los usuarios
router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["Admin"]),
  async (req, res) => {
    try {
      const result = await findAllUsers();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//  Usuario puede verse a sí mismo o ADMIN puede ver cualquiera
router.get(
  "/byId/:id",
  authMiddleware,
  async (req, res) => {
    const { id } = req.params;

    try {
      if (req.user.id !== id && req.user.rol !== "Admin") {
        return res.status(403).json({ error: "Sin permisos" });
      }

      const result = await findUserById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);



export default router;
