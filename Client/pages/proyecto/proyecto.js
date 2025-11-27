import { renderNavbar } from "../../components/navbar.js";
import { renderProjectDescription } from "../../components/projectDescription.js";
import { renderKanban } from "../../components/kanban.js";

// NAVBAR
document
  .querySelector(".layout")
  .insertAdjacentHTML("afterbegin", renderNavbar("proyectos"));

// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Cargar proyecto
async function loadProject() {
  try {
    const res = await fetch(`http://localhost:3000/proyecto/byId/${id}`);

    if (!res.ok) throw new Error("Error al cargar el proyecto");

    const project = await res.json();

    // Traer responsables
    const resUsers = await fetch(
      `http://localhost:3000/proyecto-usuario/byProject/${id}`
    );
    const users = await resUsers.json();

    const nombresResponsables = users.map((u) => u.nombre).join(", ");

    // Setear título
    document.querySelector(".projects-title").textContent = project.nombre;

    // Fechas
    const fechaInicio = project.fechaInicio
      ? new Date(project.fechaInicio).toLocaleDateString()
      : "Sin fecha";

    const fechaLimite = project.fechaLimite
      ? new Date(project.fechaLimite).toLocaleDateString()
      : "Sin fecha";

    const responsables = await loadResponsables();
    // Render info
    document.querySelector("#projectInfo").innerHTML = renderProjectDescription(
      {
        nombre: project.nombre,
        descripcion: project.descripcion,
        cliente: project.cliente?.nombre,
        presupuesto: project.presupuesto,
        inicio: fechaInicio,
        fin: fechaLimite,
        responsables: responsables,
      }
    );
  } catch (error) {
    console.error("Error cargando proyecto:", error);
    document.querySelector(".projects-title").textContent =
      "Error al cargar proyecto";
  }
}
async function loadResponsables() {
  try {
    const res = await fetch(
      `http://localhost:3000/proyecto-usuario/byProject/${id}`
    );

    if (!res.ok) {
      throw new Error("Error al cargar responsables");
    }

    const data = await res.json();

    // Extraer solo los nombres
    const nombres = data.map((rel) => rel.usuario.nombre);

    return nombres.join(", ");
  } catch (error) {
    console.error("Error cargando responsables:", error);
    return "Sin responsables";
  }
}

async function loadKanban() {
  try {
    const res = await fetch("http://localhost:3000/tarea/all");

    if (!res.ok) {
      throw new Error("Error al cargar tareas");
    }

    const tareas = await res.json();

    // Filtrar solo las tareas de este proyecto
    const tareasProyecto = tareas.filter((t) => t.idProyecto._id === id);

    // Agrupar por estado
    const columnasMap = {};

    tareasProyecto.forEach((tarea) => {
      const estado = tarea.idEstado?.nombre || "Sin estado";

      if (!columnasMap[estado]) {
        columnasMap[estado] = [];
      }

      columnasMap[estado].push({
        _id: tarea._id, // IMPORTANTE
        title: tarea.descripcion,
        urgencia: tarea.idUrgencia?.nombre || "",
        responsable: tarea.idUsuario?.nombre || "",
        fecha: tarea.fechaLimite
          ? new Date(tarea.fechaLimite).toLocaleDateString()
          : "",
      });
      
      
      
    });

    const estadosBase = ["Por hacer", "En progreso", "Hecho"];

    const kanbanData = estadosBase.map((estado) => ({
      title: estado,
      color: getColorByEstado(estado),
      tasks: columnasMap[estado] || [],
    }));


    // Render Kanban
    document.querySelector("#kanbanContainer").innerHTML =
      renderKanban(kanbanData);
  } catch (error) {
    console.error("Error cargando kanban:", error);
  }
}
function getColorByEstado(estado) {
  switch (estado.toLowerCase()) {
    case "por hacer":
      return "#FF3231"; // rojo
    case "en progreso":
      return "#CBBB2A"; // amarillo oliva
    case "hecho":
      return "#423F3F"; // gris oscuro
    default:
      return "#6b7280";
  }
}

let estadoSeleccionado = null;
//  Botón "Agregar Tarea" de la parte superior
document
  .querySelector(".project-add-task-btn")
  .addEventListener("click", () => {
    estadoSeleccionado = null; // No forzamos estado

    tareaEditandoId = null; // aseguramos que no esté editando

    document.querySelector("#taskModalTitle").textContent = "Nueva tarea";

    // Limpia campos
    document.querySelector("#taskDesc").value = "";
    document.querySelector("#taskUser").value = "";
    document.querySelector("#taskUrgencia").value = "";
    document.querySelector("#taskFechaInicio").value = "";
    document.querySelector("#taskFechaLimite").value = "";

    document.querySelector("#taskModal").classList.remove("hidden");
  });


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("kanban-add-btn")) {
    estadoSeleccionado = e.target.dataset.estado;

    tareaEditandoId = null;

    document.querySelector("#taskModalTitle").textContent = "Nueva tarea";

    // Limpiar inputs
    document.querySelector("#taskDesc").value = "";
    document.querySelector("#taskUser").value = "";
    document.querySelector("#taskUrgencia").value = "";
    document.querySelector("#taskFechaInicio").value = "";
    document.querySelector("#taskFechaLimite").value = "";

    document.querySelector("#taskModal").classList.remove("hidden");
  }
  
});


document.querySelector("#cancelTask").addEventListener("click", () => {
  document.querySelector("#taskModal").classList.add("hidden");
});
async function loadUsuariosProyecto() {
  const res = await fetch(
    `http://localhost:3000/proyecto-usuario/byProject/${id}`
  );
  const data = await res.json();

  const select = document.querySelector("#taskUser");
  select.innerHTML = `<option value="">Sin responsable</option>`;

  data.forEach((rel) => {
    const option = document.createElement("option");
    option.value = rel.usuario._id;
    option.textContent = rel.usuario.nombre;
    select.appendChild(option);
  });
}
async function loadEstados() {
  const res = await fetch("http://localhost:3000/estado/all");
  const estados = await res.json();

  const select = document.querySelector("#taskEstado");
  select.innerHTML = "";

  estados.forEach((e) => {
    const option = document.createElement("option");
    option.value = e._id;
    option.textContent = e.nombre;
    select.appendChild(option);
  });
}
async function loadUrgencias() {
  const res = await fetch("http://localhost:3000/urgencia/all");
  const urgencias = await res.json();

  const select = document.querySelector("#taskUrgencia");
  select.innerHTML = `<option value="">Sin urgencia</option>`;

  urgencias.forEach((u) => {
    const option = document.createElement("option");
    option.value = u._id;
    option.textContent = u.nombre;
    select.appendChild(option);
  });
}
document.querySelector("#saveTask").addEventListener("click", async () => {
  const descripcion = document.querySelector("#taskDesc").value;
  const idUsuario = document.querySelector("#taskUser").value || null;
  const idUrgencia = document.querySelector("#taskUrgencia").value || null;
  const fechaInicio = document.querySelector("#taskFechaInicio").value;
  const fechaLimite = document.querySelector("#taskFechaLimite").value;
  const idEstado = document.querySelector("#taskEstado").value;

  const body = {
    descripcion,
    idProyecto: id,
    idEstado,
  };

  if (idUsuario) body.idUsuario = idUsuario;
  if (idUrgencia) body.idUrgencia = idUrgencia;
  if (fechaInicio) body.fechaInicio = fechaInicio;
  if (fechaLimite) body.fechaLimite = fechaLimite;

  const url = tareaEditandoId
    ? `http://localhost:3000/tarea/update/${tareaEditandoId}`
    : "http://localhost:3000/tarea/create";

  const method = tareaEditandoId ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  tareaEditandoId = null;


  document.querySelector("#taskModal").classList.add("hidden");

  // recargar kanban
  loadKanban();
});

let tareaEditandoId = null;

document.addEventListener("click", async (e) => {
  const task = e.target.closest(".kanban-task");
  if (!task) return;

  const idTarea = task.dataset.id;
  tareaEditandoId = idTarea;

  const res = await fetch(`http://localhost:3000/tarea/byId/${idTarea}`);
  const data = await res.json();

  document.querySelector("#taskDesc").value = data.descripcion || "";
  document.querySelector("#taskUser").value = data.idUsuario?._id || "";
  document.querySelector("#taskUrgencia").value = data.idUrgencia?._id || "";
  document.querySelector("#taskFechaInicio").value = data.fechaInicio
    ? data.fechaInicio.split("T")[0]
    : "";
  document.querySelector("#taskFechaLimite").value = data.fechaLimite
    ? data.fechaLimite.split("T")[0]
    : "";
  document.querySelector("#taskEstado").value = data.idEstado?._id || "";

  // ✅ Cambiar título
  document.querySelector("#taskModalTitle").textContent = "Editar tarea";

  document.querySelector("#taskModal").classList.remove("hidden");
});


let tareaArrastradaId = null;

document.addEventListener("dragstart", (e) => {
  const task = e.target.closest(".kanban-task");
  if (!task) return;

  tareaArrastradaId = task.dataset.id;
  task.classList.add("dragging");
});

document.addEventListener("dragover", (e) => {
  if (e.target.closest(".kanban-column")) {
    e.preventDefault();
  }
});
document.addEventListener("dragend", (e) => {
  const task = e.target.closest(".kanban-task");
  if (!task) return;
  task.classList.remove("dragging");
});

document.addEventListener("drop", async (e) => {
  const column = e.target.closest(".kanban-column");
  if (!column || !tareaArrastradaId) return;

  const nuevoEstadoNombre = column.dataset.estado;

  // Buscar el ID real del estado
  const resEstados = await fetch("http://localhost:3000/estado/all");
  const estados = await resEstados.json();

  const estado = estados.find(
    (e) => e.nombre.toLowerCase() === nuevoEstadoNombre.toLowerCase()
  );

  if (!estado) return;

  await fetch(`http://localhost:3000/tarea/update/${tareaArrastradaId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idEstado: estado._id }),
  });

  tareaArrastradaId = null;
  loadKanban();
});


loadUsuariosProyecto();
loadEstados();
loadUrgencias();

loadProject();
loadKanban();



