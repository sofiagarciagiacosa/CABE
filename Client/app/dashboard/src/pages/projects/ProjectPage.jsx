import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProjectDescription from "../../components/projects/ProjectDescription";
import KanbanBoard from "../../components/kanban/KanbanBoard";
import TaskModal from "../../components/projects/TaskModal";
import ProjectModal from "../../components/projects/ProjectModal";

function ProjectPage() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [columns, setColumns] = useState([]);

  const [usuarios, setUsuarios] = useState([]);
  const [estados, setEstados] = useState([]); 
  const [urgencias, setUrgencias] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  // ✅ FORM BIEN INICIALIZADO
  const initialForm = {
    descripcion: "",
    idUsuario: "",
    idUrgencia: "",
    fechaInicio: "",
    fechaLimite: "",
    idEstado: ""
  };

  const [form, setForm] = useState(initialForm);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // 🔥 función reutilizable para refrescar kanban
  const reloadKanban = async () => {
    const res = await fetch("http://localhost:3000/tarea/all");
    const tareas = await res.json();

    const tareasProyecto = tareas.filter(
      (t) => t.idProyecto._id === id
    );

    const map = {};

    tareasProyecto.forEach((t) => {
      const estado = t.idEstado?.nombre || "Sin estado";

      if (!map[estado]) map[estado] = [];

      map[estado].push({
        _id: t._id,
        title: t.descripcion,
        urgencia: t.idUrgencia?.nombre,
        responsable: t.idUsuario?.nombre,
        fecha: t.fechaLimite
          ? new Date(t.fechaLimite).toLocaleDateString()
          : ""
      });
    });

    const estadosBase = ["Por hacer", "En progreso", "Hecho"];

    setColumns(
      estadosBase.map((e) => ({
        title: e,
        color:
          e === "Por hacer"
            ? "#FF3231"
            : e === "En progreso"
            ? "#CBBB2A"
            : "#423F3F",
        tasks: map[e] || []
      }))
    );
  };

  // ✅ cargar datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          projectRes,
          usersRes,
          tareasRes,
          estadosRes,
          urgenciasRes
        ] = await Promise.all([
          fetch(`http://localhost:3000/proyecto/byId/${id}`),
          fetch(`http://localhost:3000/proyecto-usuario/byProject/${id}`),
          fetch("http://localhost:3000/tarea/all"),
          fetch("http://localhost:3000/estado/all"),
          fetch("http://localhost:3000/urgencia/all")
        ]);

        const projectData = await projectRes.json();
        const usersData = await usersRes.json();
        const tareasData = await tareasRes.json();
        const estadosData = await estadosRes.json();
        const urgenciasData = await urgenciasRes.json();

        setEstados(estadosData);
        setUrgencias(urgenciasData);
        setUsuarios(
         usersData
            .filter((u) => u.usuario)
            .map((u) => u.usuario)
        );

        const responsablesIds = usersData
            .filter((u) => u.usuario)
            .map((u) => u.usuario._id);

        const responsablesNombres = usersData
            .filter((u) => u.usuario)
            .map((u) => u.usuario.nombre)
            .join(", ");

        setProject({
            _id: projectData._id, // 🔥 IMPORTANTE
            nombre: projectData.nombre,
            descripcion: projectData.descripcion,
            cliente: projectData.cliente?.nombre,
            clienteId: projectData.cliente?._id,
            presupuesto: projectData.presupuesto,
            inicio: projectData.fechaInicio?.split("T")[0],
            fin: projectData.fechaLimite?.split("T")[0],
            responsables: responsablesIds, 
            responsablesNombres: responsablesNombres
        });

        // 🔥 usar misma lógica de reload
        const tareasProyecto = tareasData.filter(
          (t) => t.idProyecto._id === id
        );

        const map = {};

        tareasProyecto.forEach((t) => {
          const estado = t.idEstado?.nombre || "Sin estado";

          if (!map[estado]) map[estado] = [];

          map[estado].push({
            _id: t._id,
            title: t.descripcion,
            urgencia: t.idUrgencia?.nombre,
            responsable: t.idUsuario?.nombre,
            fecha: t.fechaLimite
              ? new Date(t.fechaLimite).toLocaleDateString()
              : ""
          });
        });

        const estadosBase = ["Por hacer", "En progreso", "Hecho"];

        setColumns(
          estadosBase.map((e) => ({
            title: e,
            color:
              e === "Por hacer"
                ? "#FF3231"
                : e === "En progreso"
                ? "#CBBB2A"
                : "#423F3F",
            tasks: map[e] || []
          }))
        );

      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  // AGREGAR TAREA
  const handleAddTask = (estado = null) => {
    setEditingTaskId(null);
    setEstadoSeleccionado(estado);
    setForm(initialForm); // importante
    setShowModal(true);
  };

  // EDITAR
  const handleTaskClick = async (task) => {
    try {
      const res = await fetch(
        `http://localhost:3000/tarea/byId/${task._id}`
      );
      const data = await res.json();
      console.log("RESPUESTA:", data);

      setEditingTaskId(task._id);
      setForm({
        descripcion: data.descripcion || "",
        idUsuario: data.idUsuario?._id || "",
        idUrgencia: data.idUrgencia?._id || "",
        fechaInicio: data.fechaInicio?.split("T")[0] || "",
        fechaLimite: data.fechaLimite?.split("T")[0] || "",
        idEstado: data.idEstado?._id || ""
      });
      
      setShowModal(true);
    } catch (error) {
      console.error("Error cargando tarea:", error);
    }
  };

  //  GUARDAR
  const handleSave = async () => {
    try {
      const url = editingTaskId
        ? `http://localhost:3000/tarea/update/${editingTaskId}`
        : "http://localhost:3000/tarea/create";

      const method = editingTaskId ? "PUT" : "POST";

      let estadoId = form.idEstado;

        // 🔥 SI NO HAY ESTADO → usar estadoSeleccionado (kanban)
        if (!estadoId && estadoSeleccionado) {
        const estado = estados.find(
            (e) =>
            e.nombre.toLowerCase() === estadoSeleccionado.toLowerCase()
        );
        estadoId = estado?._id;
        }

        // 🔥 SI SIGUE SIN HABER → usar el PRIMERO (como hacía el HTML)
        if (!estadoId && estados.length > 0) {
        estadoId = estados[0]._id;
        }

      const body = {
        descripcion: form.descripcion,
        idProyecto: id,
        idEstado: estadoId,
        };

        if (form.idUsuario) body.idUsuario = form.idUsuario;
        if (form.idUrgencia) body.idUrgencia = form.idUrgencia;
        if (form.fechaInicio) body.fechaInicio = form.fechaInicio;
        if (form.fechaLimite) body.fechaLimite = form.fechaLimite;

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error backend:", errorText);
        return;
      }
      console.log("BODY:", body);
      console.log("FORM ANTES DE GUARDAR:", form);
      setShowModal(false);
      await reloadKanban();

    } catch (error) {
      console.error("Error guardando tarea:", error);
    }
  };

  // ✅ DRAG
  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDrop = async (estadoNombre) => {
    if (!draggedTaskId) return;

    const estado = estados.find(
      (e) =>
        e.nombre.toLowerCase() === estadoNombre.toLowerCase()
    );

    if (!estado) return;

    await fetch(
      `http://localhost:3000/tarea/update/${draggedTaskId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idEstado: estado._id })
      }
    );

    setDraggedTaskId(null);
    await reloadKanban();
  };

  if (!project) return <div>Loading...</div>;

  return (
    <main className="page">
      <div className="project-page-header d-flex justify-content-between align-items-center mb-4">
        <h1 className="projects-title">{project.nombre}</h1>

        <div className="d-flex gap-2">
          <button
            className="project-edit-btn"
            onClick={() => {
                setProjectToEdit(project);
                setShowProjectModal(true);
            }}
          >
            Editar
          </button>

          <button
            className="project-add-task-btn"
            onClick={() => handleAddTask()}
          >
            Agregar Tarea
          </button>

          <button
            className="project-delete-btn"
            onClick={() => console.log("eliminar proyecto")}
          >
            🗑
          </button>
        </div>
      </div>

      <div className="project-info-container">
        <ProjectDescription project={project} />
      </div>

      <KanbanBoard
        columns={columns}
        onAddTask={handleAddTask} // 🔥 listo para usar desde columnas
        onTaskClick={handleTaskClick}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />

      <TaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        usuarios={usuarios}
        estados={estados}
        urgencias={urgencias}
        isEditing={!!editingTaskId}
      />
      {showProjectModal && (
        <ProjectModal
            project={projectToEdit}
            onClose={() => setShowProjectModal(false)}
            onCreated={async () => {
            setShowProjectModal(false);
            window.location.reload();
            }}
        />
      )}
    </main>

    
  );
}

export default ProjectPage;