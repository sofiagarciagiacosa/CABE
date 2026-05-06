import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../db/schemas/usuario.schema.js";
import { sendResetEmail } from "../utils/mailer.js";
import crypto from "crypto";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const user = await Usuario.findOne({ email: email.toLowerCase() })
      .select("+password")
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
        email: user.email,
        rol: user.rol.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    //  devolver user completo (sin password)
    const userData = await Usuario.findById(user._id)
      .select("-password")
      .populate("rol");

    res.status(200).json({
      token,
      user: userData,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});



router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email requerido" });
    }

    const user = await Usuario.findOne({ email });

    // ⚠️ seguridad: NO decir si existe o no
    if (!user) {
      return res.json({
        message: "Si el email existe, se enviará un correo",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    //  guardar token en DB
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 1000 * 60 * 15; // 15 min

    await user.save();

    //  link
    const link = `http://localhost:5173/reset-password?token=${token}`;

    // enviar mail
    await sendResetEmail(user.email, link);

    res.json({
      message: "Email enviado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en forgot password" });
  }
});
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await Usuario.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    }).populate("rol");

    if (!user) {
      return res.status(400).json({
        error: "Token inválido o expirado",
      });
    }

    // hash nueva password
    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpires = null;

    await user.save();

    // 🔥 auto login
    const newToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        rol: user.rol.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    const userData = await Usuario.findById(user._id)
      .select("-password")
      .populate("rol");

    res.json({
      token: newToken,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error reseteando password" });
  }
});

export default router;
