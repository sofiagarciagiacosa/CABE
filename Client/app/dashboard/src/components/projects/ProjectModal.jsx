import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";

const API_URL = "http://localhost:3000";

const toDateInputValue = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const getProjectClientId = (project) => {
  if (!project) return "";
  return project.cliente?._id || project.cliente || project.clienteId || "";
};

const getProjectResponsables = (project) => {
  if (!project?.responsables) return [];

  return project.responsables
    .map((responsable) => responsable?._id || responsable)
    .filter(Boolean);
};

function ProjectModal({ project, onClose, onCreated }) {
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [activeSection, setActiveSection] = useState("general");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] =useState(() => ({
    nombre: project?.nombre || "",
    descripcion: project?.descripcion || "",
    presupuesto: project?.presupuesto || "",

    cliente: getProjectClientId(project),

    fechaInicio: toDateInputValue(project?.fechaInicio),
    fechaLimite: toDateInputValue(project?.fechaLimite),
    fechaFinalizacion: toDateInputValue(project?.fechaFinalizacion),

    estado: project?.estado || "Planificado",
    prioridad: project?.prioridad || "Media",
    tipoServicio: project?.tipoServicio || "",
    progreso: project?.progreso ?? 0,

    responsables: getProjectResponsables(project),
  }));

  useEffect(() => {
    let ignore = false;

    const fetchJson = async (url, options = {}) => {
      const res = await fetch(url, options);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "No se pudo cargar la informacion.");
      }

      return data;
    };

    const fetchData = async () => {
      try {
        const token = getToken();
        const clientesData = await fetchJson(`${API_URL}/cliente`);

        let usuariosData = [];
        if (token) {
          try {
            usuariosData = await fetchJson(`${API_URL}/usuario/all`, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } catch (err) {
            console.warn("No se pudieron cargar usuarios:", err.message);
          }
        }

        if (!ignore) {
          setClientes(Array.isArray(clientesData) ? clientesData : []);
          setUsuarios(Array.isArray(usuariosData) ? usuariosData : []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setClientes([]);
          setUsuarios([]);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      presupuesto: Number(form.presupuesto),

      cliente: form.cliente,

      fechaInicio: form.fechaInicio || undefined,
      fechaLimite: form.fechaLimite || undefined,
      fechaFinalizacion: form.fechaFinalizacion || undefined,

      estado: form.estado,
      prioridad: form.prioridad,
      tipoServicio: form.tipoServicio,
      progreso: Number(form.progreso),
    };
    /* VALIDACIONES */

    if (!form.nombre.trim()) {
      setError("El nombre del proyecto es obligatorio.");
      setIsSaving(false);
      return;
    }

    if (form.nombre.length > 60) {
      setError("El nombre no puede superar los 60 caracteres.");
      setIsSaving(false);
      return;
    }

    if (
      form.fechaInicio &&
      form.fechaLimite &&
      form.fechaLimite < form.fechaInicio
    ) {
      setError(
        "La fecha límite no puede ser anterior a la fecha de inicio."
      );
      setIsSaving(false);
      return;
    }

    if (Number(form.presupuesto) <= 0) {
      setError("El presupuesto debe ser mayor a 0.");
      setIsSaving(false);
      return;
    }

    if (
      !payload.nombre ||
      !payload.descripcion ||
      !payload.presupuesto ||
      !payload.cliente
    ) {
      setError(
        "Completa nombre, descripción, presupuesto y cliente."
      );
      setIsSaving(false);
      return;
    }
    

    try {
      const url = project
        ? `${API_URL}/proyecto/update/${project._id}`
        : `${API_URL}/proyecto/create`;

      const res = await fetch(url, {
        method: project ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "No se pudo guardar el proyecto.");
      }

      const proyectoId = data?.result?._id || data?._id || project?._id;

      if (!proyectoId) {
        throw new Error("El servidor no devolvio el ID del proyecto.");
      }

      if (project) {
        await fetch(`${API_URL}/proyecto-usuario/updateByProject/${proyectoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuarios: form.responsables }),
        });
      } else if (form.responsables.length > 0) {
        await Promise.all(
          form.responsables.map((userId) =>
            fetch(`${API_URL}/proyecto-usuario/assign`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                proyecto: proyectoId,
                usuario: userId,
              }),
            })
          )
        );
      }
      

      await onCreated?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="project-modal" onClick={onClose}>
      <div
        className="project-modal-card project-create-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-modal-header">
          <div>
            <span className="project-modal-kicker">
              {project ? "Editar proyecto" : "Nuevo proyecto"}
            </span>
            <h2>Detalles del proyecto</h2>
          </div>

          <button
            type="button"
            className="project-modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="project-modal-divider" />

        {error && <p className="modal-error">{error}</p>}

        <form className="project-create-form" onSubmit={handleSubmit}>
          <div className="accordion-section">
            <button
              type="button"
              className="accordion-header"
              onClick={() => toggleSection("general")}
            >
              <span>Informacion general</span>
              <i
                className={`bi bi-chevron-${
                  activeSection === "general" ? "up" : "down"
                }`}
              />
            </button>

            {activeSection === "general" && (
              <div className="accordion-content">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre *</label>
                    <input
                      placeholder="Nombre del proyecto"
                      value={form.nombre}
                      onChange={(e) => updateField("nombre", e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Cliente *</label>
                    <select
                      value={form.cliente}
                      onChange={(e) => updateField("cliente", e.target.value)}
                      required
                    >
                      <option value="">Seleccionar cliente</option>
                      {clientes.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                    <label>Tipo de servicio</label>

                    <select
                        value={form.tipoServicio}
                        onChange={(e) =>
                            updateField("tipoServicio", e.target.value)
                        }
                    >
                        <option value="">Seleccionar servicio</option>

                        <option>Estrategia y construcción de marca</option>

                        <option>Branding y desarrollo visual</option>

                        <option>Creación de contenido</option>

                        <option>Dirección creativa y producción</option>

                        <option>Acompañamiento y consultoría</option>
                    </select>
                </div>

                <div className="form-group">
                  <label>Descripcion *</label>
                  <textarea
                    className="project-textarea"
                    placeholder="Breve descripcion del alcance, objetivo o contexto..."
                    value={form.descripcion}
                    onChange={(e) => updateField("descripcion", e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="project-modal-divider" />

          <div className="accordion-section">
            <button
              type="button"
              className="accordion-header"
              onClick={() => toggleSection("planning")}
            >
              <span>Planificación</span>

              <i
                className={`bi bi-chevron-${
                  activeSection === "planning" ? "up" : "down"
                }`}
              />
            </button>

            {activeSection === "planning" && (
              <div className="accordion-content">

                {/* Estado - Prioridad - Presupuesto */}
                <div className="form-row">

                  <div className="form-group">
                    <label>Estado</label>

                    <select
                      value={form.estado}
                      onChange={(e) => updateField("estado", e.target.value)}
                    >
                      <option>Planificado</option>
                      <option>En progreso</option>
                      <option>En revisión</option>
                      <option>Pausado</option>
                      <option>Finalizado</option>
                      <option>Cancelado</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Prioridad</label>

                    <select
                      value={form.prioridad}
                      onChange={(e) => updateField("prioridad", e.target.value)}
                    >
                      <option>Alta</option>
                      <option>Media</option>
                      <option>Baja</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Presupuesto *</label>

                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={form.presupuesto}
                      onChange={(e) =>
                        updateField("presupuesto", e.target.value)
                      }
                      required
                    />
                  </div>

                </div>

                {/* Fechas */}
                <div className="form-row">

                  <div className="form-group">
                    <label>Fecha inicio</label>

                    <input
                      type="date"
                      value={form.fechaInicio}
                      onChange={(e) =>
                        updateField("fechaInicio", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Fecha límite</label>

                    <input
                      type="date"
                      value={form.fechaLimite}
                      onChange={(e) =>
                        updateField("fechaLimite", e.target.value)
                      }
                    />
                  </div>

                </div>

              </div>
            )}
          </div>

          <div className="project-modal-divider" />

          <div className="accordion-section">
            <button
              type="button"
              className="accordion-header"
              onClick={() => toggleSection("team")}
            >
              <span>Equipo</span>
              <i
                className={`bi bi-chevron-${activeSection === "team" ? "up" : "down"}`}
              />
            </button>

            {activeSection === "team" && (
              <div className="accordion-content">
                {usuarios.length > 0 ? (
                  <div className="responsables-grid">
                    {usuarios.map((u) => (
                      <label className="responsable-item" key={u._id}>
                        <input
                          type="checkbox"
                          value={u._id}
                          checked={form.responsables.includes(u._id)}
                          onChange={(e) => {
                            const checked = e.target.checked;

                            updateField(
                              "responsables",
                              checked
                                ? [...form.responsables, u._id]
                                : form.responsables.filter((id) => id !== u._id)
                            );
                          }}
                        />
                        <span>{u.nombre}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="project-modal-muted">
                    No hay usuarios disponibles para asignar en este momento.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="project-modal-divider" />

          <div className="project-modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancelar
            </button>

            <button type="submit" className="save-btn" disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;
