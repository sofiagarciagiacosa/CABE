import express from "express";
import dotenv from "dotenv";
import proyectoRouter from "./Server/Routes/proyecto.routes.js";
import usuarioRouter from "./Server/Routes/usuario.routes.js";
import rolRouter from "./Server/Routes/rol.routes.js";
import proyectoUsuarioRouter from "./Server/Routes/proyectoUsuario.routes.js";
import clienteRoutes from "./Server/Routes/cliente.routes.js";
import estadoRouter from "./Server/Routes/estado.routes.js";
import urgenciaRouter from "./Server/Routes/urgencia.routes.js";
import tareaRouter from "./Server/Routes/tarea.routes.js";


import { connectDB } from "./Server/db/connection.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Conectar a la base
connectDB();

app.use(express.static("./Client"));

// Rutas
app.use("/proyecto", proyectoRouter);
app.use("/usuario", usuarioRouter);
app.use("/rol", rolRouter);
app.use("/proyecto-usuario", proyectoUsuarioRouter);
app.use("/cliente", clienteRoutes);
app.use("/estado", estadoRouter);
app.use("/urgencia", urgenciaRouter);
app.use("/tarea", tareaRouter);



// Levantar servidor (siempre al final)
app.listen(port, () => {
  console.log(`Servidor levantado en puerto ${port}`);
});
