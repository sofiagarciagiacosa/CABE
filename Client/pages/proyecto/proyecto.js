import { renderNavbar } from "../../components/navbar.js";
import { renderProjectDescription } from "../../components/projectDescription.js";
import { renderKanban } from "../../components/kanban.js";
import { renderProjectModal } from "../../components/modalProject.js";

// NAVBAR
document
  .querySelector(".layout")
  .insertAdjacentHTML("afterbegin", renderNavbar("proyectos"));

document
  .querySelector(".layout")
  .insertAdjacentHTML("beforeend", renderProjectModal());

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

    const nombresResponsables = users.map((u) => u.usuario.nombre).join(", ");


    // Setear título
    document.querySelector(".projects-title").textContent = project.nombre;

    // Fechas
    const fechaInicio = project.fechaInicio
      ? project.fechaInicio.split("T")[0].split("-").reverse().join("/")
      : "Sin fecha";

      const fechaLimite = project.fechaLimite
        ? project.fechaLimite.split("T")[0].split("-").reverse().join("/")
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
async function loadClientes(selectedId = null) {
  const res = await fetch("http://localhost:3000/cliente");
  const clientes = await res.json();

  const select = document.querySelector("#clienteSelect");
  select.innerHTML = `<option value="">Seleccionar cliente</option>`;

  clientes.forEach((c) => {
    const option = document.createElement("option");
    option.value = c._id;
    option.textContent = c.nombre;

    if (selectedId && selectedId === c._id) {
      option.selected = true;
    }

    select.appendChild(option);
  });
}
async function loadResponsablesEditar(projectId) {
  const resAll = await fetch("http://localhost:3000/usuario/all");
  const usuarios = await resAll.json();

  const resRel = await fetch(
    `http://localhost:3000/proyecto-usuario/byProject/${projectId}`
  );
  const relaciones = await resRel.json();

  const seleccionados = relaciones.map((r) => r.usuario._id);

  const container = document.querySelector("#responsablesContainer");
  container.innerHTML = "";

  usuarios.forEach((u) => {
    const label = document.createElement("label");
    label.classList.add("d-flex", "gap-2");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = u._id;
    checkbox.name = "responsables";

    if (seleccionados.includes(u._id)) {
      checkbox.checked = true;
    }

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(u.nombre));

    container.appendChild(label);
  });
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
document
  .querySelector(".project-delete-btn")
  .addEventListener("click", async () => {
    const seguro = confirm(
      "¿Estás segura de que querés eliminar este proyecto?"
    );
    if (!seguro) return;

    try {
      // 1. Borrar tareas primero (opcional)
      await fetch(`http://localhost:3000/tarea/deleteByProject/${id}`, {
        method: "DELETE",
      });

      // 2. Borrar proyecto
      const res = await fetch(`http://localhost:3000/proyecto/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      alert("Proyecto eliminado correctamente");
      window.location.href =
        "http://localhost:3000/pages/proyectos/proyectos.html";
    } catch (error) {
      console.error("Error real al eliminar:", error);
      alert("No se pudo eliminar el proyecto");
    }
  });

  document
    .querySelector(".project-edit-btn")
    .addEventListener("click", async () => {
      try {
        const res = await fetch(`http://localhost:3000/proyecto/byId/${id}`);
        const proyecto = await res.json();

        // Cargar datos básicos
        document.querySelector("#nombre").value = proyecto.nombre;
        document.querySelector("#descripcion").value = proyecto.descripcion;
        document.querySelector("#presupuesto").value = proyecto.presupuesto;
        document.querySelector("#fechaLimite").value =
          proyecto.fechaLimite?.split("T")[0] || "";
        document.querySelector("#fechaInicio").value =
            proyecto.fechaInicio?.split("T")[0] || "";
        

        // ahora sí carga bien
        await loadClientes(proyecto.cliente?._id);
        await loadResponsablesEditar(id);

        document.querySelector(".modal-title").textContent = "Editar proyecto";

        window.proyectoEditando = id;

        document.querySelector("#projectModal").classList.remove("d-none");
      } catch (error) {
        console.error("Error cargando datos para editar:", error);
      }
    });


const form = document.querySelector("#projectForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: document.querySelector("#nombre").value,
      descripcion: document.querySelector("#descripcion").value,
      presupuesto: document.querySelector("#presupuesto").value,
      fechaInicio: document.querySelector("#fechaInicio")?.value,
      fechaLimite: document.querySelector("#fechaLimite").value,
      cliente: document.querySelector("#clienteSelect").value,
    };
    const responsablesSeleccionados = Array.from(
      document.querySelectorAll('input[name="responsables"]:checked')
    ).map((cb) => cb.value);
    

    try {
      if (window.proyectoEditando) {
        await fetch(
          `http://localhost:3000/proyecto/update/${window.proyectoEditando}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        await fetch(
          `http://localhost:3000/proyecto-usuario/updateByProject/${window.proyectoEditando}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              usuarios: responsablesSeleccionados,
            }),
          }
        );
        

        alert("Proyecto actualizado");
        loadProject();
      } else {
        await fetch("http://localhost:3000/proyecto/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        alert("Proyecto creado");
      }

      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      alert("Hubo un error");
    }
  });
}
document.querySelector("#cancelBtn")?.addEventListener("click", () => {
  document.querySelector("#projectModal").classList.add("d-none");
  window.proyectoEditando = null;
});


loadUsuariosProyecto();
loadEstados();
loadUrgencias();

loadProject();
loadKanban();



