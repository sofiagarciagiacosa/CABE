import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../db/schemas/usuario.schema.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ email }).populate("rol");

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // TOKEN BIEN HECHO
    const token = jwt.sign(
      {
        id: user._id,
        rol: user.rol.nombre, // CLAVE
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol.nombre,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
