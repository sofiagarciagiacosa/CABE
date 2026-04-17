import express from "express";
import dotenv from "dotenv";

import cors from "cors"; // por react

import proyectoRouter from "./Server/Routes/proyecto.routes.js";
import usuarioRouter from "./Server/Routes/usuario.routes.js";
import rolRouter from "./Server/Routes/rol.routes.js";
import proyectoUsuarioRouter from "./Server/Routes/proyectoUsuario.routes.js";
import clienteRoutes from "./Server/Routes/cliente.routes.js";
import estadoRouter from "./Server/Routes/estado.routes.js";
import urgenciaRouter from "./Server/Routes/urgencia.routes.js";
import tareaRouter from "./Server/Routes/tarea.routes.js";
import authRouter from "./Server/Routes/auth.routes.js";

import { connectDB } from "./Server/db/connection.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors({
  origin: "http://localhost:5173", // React (Vite)
}));
app.use(express.json());

// Conectar a la base
connectDB();

//solo para html vainilla
//app.use(express.static("./Client"));

// Rutas
app.use("/proyecto", proyectoRouter);
app.use("/usuario", usuarioRouter);
app.use("/rol", rolRouter);
app.use("/proyecto-usuario", proyectoUsuarioRouter);
app.use("/cliente", clienteRoutes);
app.use("/estado", estadoRouter);
app.use("/urgencia", urgenciaRouter);
app.use("/tarea", tareaRouter);
app.use("/auth", authRouter);



// Levantar servidor (siempre al final)
/*
app.listen(port, () => {
  console.log(`Servidor levantado en puerto ${port}`);
});
*/

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
