import { renderNavbar } from "../../components/navbar.js";
import {
  createProjectCard,
  createAddCardButton,
} from "../../components/projectsCard.js";

// --- Insertar NAVBAR ---
document
  .querySelector(".layout")
  .insertAdjacentHTML("afterbegin", renderNavbar("proyectos"));

// --- Contenedor del grid ---
const grid = document.querySelector(".row");

//  Traer proyectos desde el BACK
async function loadProjects() {
  try {
    const res = await fetch("http://localhost:3000/proyecto/all/details");
    const projects = await res.json();

    const grid = document.querySelector(".row");
    grid.innerHTML = "";

    // contador
    document.querySelector(".projects-count").textContent = projects.length;

    projects.forEach((proy) => {
      grid.innerHTML += createProjectCard({
        id: proy._id,
        nombre: proy.nombre,
        cliente: proy.cliente?.nombre || "Sin cliente",
        responsables: proy.responsables?.map((u) => u.nombre).join(", "),
      });
    });

    // Botón "+"
    grid.innerHTML += createAddCardButton();
    bindAddButton();
  } catch (err) {
    console.error(err);
  }
}

loadProjects();

const modal = document.getElementById("projectModal");
const openBtn = document.querySelector(".create-project-btn");
const cancelBtn = document.getElementById("cancelBtn");

openBtn.addEventListener("click", () => {
  modal.classList.remove("d-none");
});
function bindAddButton() {
  const addBtn = document.querySelector(".add-project-btn");
  if (addBtn) addBtn.onclick = openModal;
}
function openModal() {
  modal.classList.remove("d-none");
}
cancelBtn.addEventListener("click", () => {
  modal.classList.add("d-none");
});

const form = document.getElementById("projectForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const responsables = Array.from(
    document.querySelectorAll(".responsable-checkbox:checked")
  ).map((cb) => cb.value);
  

  const data = {
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("descripcion").value,
    presupuesto: Number(document.getElementById("presupuesto").value),
    fechaLimite: document.getElementById("fechaLimite").value,
    cliente: document.getElementById("clienteSelect").value,
    responsables: responsables,
  };


  try {
    const res = await fetch("http://localhost:3000/proyecto/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("Proyecto creado:", result);

    modal.classList.add("d-none");
    loadProjects(); // 👈 recarga la grilla
    window.location.href = `http://localhost:3000/pages/proyecto/proyecto.html?id=${result.result._id}`;
  } catch (error) {
    console.error("Error creando proyecto:", error);
  }
});

async function loadClientes() {
  const res = await fetch("http://localhost:3000/cliente");
  const data = await res.json();
  const select = document.getElementById("clienteSelect");

  select.innerHTML = data
    .map((c) => `<option value="${c._id}">${c.nombre}</option>`)
    .join("");
}

async function loadUsuarios() {
  try {
    const res = await fetch("http://localhost:3000/usuario/all");
    const users = await res.json();

    const container = document.getElementById("responsablesContainer");

    container.innerHTML = users
      .map(
        (u) => `
        <div>
          <label>
            <input type="checkbox" value="${u._id}" class="responsable-checkbox">
            ${u.nombre}
          </label>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error cargando usuarios", error);
  }
}



loadClientes();
loadUsuarios();


