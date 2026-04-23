import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../db/schemas/usuario.schema.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const user = await Usuario.findOne({ email: email.toLowerCase() })
      .select("+password") //  IMPORTANTE
      .populate("rol");

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("LOGIN ERROR:", error); // 👈 agregá esto
    res.status(500).json({ error: error.message });
  }
});

export default router;
