import { useEffect, useState } from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import AddProjectCard from "../../components/projects/AddProjectCard";
import ProjectModal from "../../components/projects/ProjectModal";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔹 función reutilizable
  const loadProjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/proyecto/all/details");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 cargar UNA sola vez
  useEffect(() => {
    const fetchData = async () => {
      await loadProjects();
    };

    fetchData();
  }, []);

  return (
    <main className="page">

      {/* HEADER */}
      <div className="projects-header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="projects-title">Proyectos</h1>

          <div className="d-flex flex-column mt-1">
            <span className="projects-count">{projects.length}</span>
            <span className="projects-status">En Progreso</span>
          </div>
        </div>

        {/* 🔴 BOTÓN HEADER */}
        <button
          className=" create-project-btn"
          onClick={() => setShowModal(true)}
        >
          Crear Proyecto
        </button>
      </div>

      {/* GRID */}
      <div className="container-fluid px-0">
        <div className="row g-4">

          {projects.map((proy) => (
            <ProjectCard key={proy._id} project={proy} />
          ))}

          {/* 🔴 CARD "+" */}
          <AddProjectCard onClick={() => setShowModal(true)} />

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <ProjectModal
          onClose={() => setShowModal(false)}
          onCreated={loadProjects} // 🔥 refresca al crear
        />
      )}

    </main>
  );
}

export default ProjectsPage;