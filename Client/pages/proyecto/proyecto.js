import { renderNavbar } from "../../components/navbar.js";
import { renderProjectDescription } from "../../components/projectDescription.js";
import { renderKanban } from "../../components/kanban.js";

// NAVBAR
document
  .querySelector(".layout")
  .insertAdjacentHTML("afterbegin", renderNavbar("proyectos"));

// Datos del proyecto (por ahora fijos)
const project = {
  nombre: "Campaña publicitaria",
  descripcion:
    "Campaña publicitaria enfocada en aumentar el reconocimiento de los nuevos productos. Incluye estrategia creativa, diseño de piezas gráficas, producción de contenido audiovisual.",
  cliente: "Panadería Carranza",
  presupuesto: "$1.200.000",
  inicio: "25 de Octubre de 2025",
  fin: "5 de Diciembre de 2025",
  responsables: "Milagros, Sol, Florencia",
};

// Insertamos descripción
document
  .querySelector("#projectInfo")
  .insertAdjacentHTML("afterbegin", renderProjectDescription(project));

// Datos del tablero Kanban
const kanbanData = [
  {
    title: "To Do",
    color: "#FF3231",
    tasks: [
      { title: "Redactar campaña", meta: "Urgente • 5 nov" },
      { title: "Revisar feedback cliente" },
      { title: "Diseñar banner", meta: "Sol • Normal • 7 nov" },
    ],
  },
  {
    title: "In Progress",
    color: "#CBBB2A",
    tasks: [
      { title: "Armar y programar reunión", meta: "Milagros • Normal" },
      { title: "Realizar cambios en el logo" },
      {
        title: "Ajustar tipografía manual de marca",
        meta: "Sol • Urgente • 11 nov",
      },
      { title: "Coordinar producción" },
    ],
  },
  {
    title: "Done",
    color: "#423F3F",
    tasks: [
      { title: "Enviar propuesta", meta: "Milagros • Urgente • 2 nov" },
      { title: "Subir edición a instagram", meta: "Flor" },
    ],
  },
];

// Render Kanban
document
  .querySelector("#kanbanContainer")
  .insertAdjacentHTML("afterbegin", renderKanban(kanbanData));
