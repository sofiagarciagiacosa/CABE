import { renderNavbar } from "../../components/navbar.js";
import {
  createProjectCard,
  createAddCardButton,
} from "../../components/projectsCard.js";

// --- Insertar NAVBAR dinámicamente ---
document
  .querySelector(".layout")
  .insertAdjacentHTML("afterbegin", renderNavbar("proyectos"));

// --- Lista de proyectos (luego la vas a traer de la BD) ---
const projects = [
  {
    title: "Campaña Publicitaria",
    brand: "Panadería Carranza",
    members: "Milagros, Sol, Florencia",
    date: "05/12/2025",
  },
  {
    title: "Rebranding Total",
    brand: "Gourmet Express",
    members: "Lucas, Sofía",
    date: "20/11/2025",
  },
  {
    title: "Gestión Redes",
    brand: "Estudio Álamo",
    members: "Martina",
    date: "01/01/2026",
  },
  {
    title: "Diseño Web",
    brand: "Tienda Boreal",
    members: "Sol, Luli",
    date: "15/10/2025",
  },
];

// --- Renderizar GRID DE PROYECTOS ---
const grid = document.querySelector(".row");

projects.forEach((p) => {
  grid.insertAdjacentHTML("beforeend", createProjectCard(p));
});

// Botón final +
grid.insertAdjacentHTML("beforeend", createAddCardButton());
