import { Router } from "express";
import {
  createProy,
  findAll,
  findById,
  findAllWithDetails,
} from "../db/actions/proyectoActions.js";

const router = Router();

// MIGRACIÓN A BASE DE DATOS

// POST para el admin para crear producto
router.post("/create", async (req, res) => {
  const {
    nombre,
    descripcion,
    presupuesto,
    fechaInicio,
    fechaLimite,
    cliente
  } = req.body;
  try {
    const result = await createProy({
      nombre,
      descripcion,
      presupuesto,
      fechaInicio,
      fechaLimite,
      cliente,
    });
    console.log(result);
    res.status(200).json({ message: "Proyecto creado con éxito", result });
  } catch (error) {
    console.error("Error en el POST:", error.message);
    res.status(400).json({ error: error.message });
  }
});

//GET para obtener proys de la base de datos
router.get("/All", async (req, res) => {
  try {
    const result = await findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json();
  }
});

//GET para obtener producto por id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await findById(id);

    if (!result) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("ERROR REAL:", error);
    res.status(400).json({ error: error.message });
  }
});
  
router.get("/all/details", async (req, res) => {
  try {
    const result = await findAllWithDetails();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default router;
