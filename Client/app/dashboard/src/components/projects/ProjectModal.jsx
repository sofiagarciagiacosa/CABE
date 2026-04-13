import { useEffect, useState } from "react";

function ProjectModal({ project, onClose, onCreated }) {
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(() => ({
    nombre: project?.nombre || "",
    descripcion: project?.descripcion || "",
    presupuesto: project?.presupuesto || "",
    cliente: project?.clienteId || "",
    fechaInicio: project?.inicio || "",
    fechaLimite: project?.fin || "",
    responsables: project?.responsables || [], 
}));

  //  useEffect limpio (sin warnings)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesRes, usuariosRes] = await Promise.all([
          fetch("http://localhost:3000/cliente"),
          fetch("http://localhost:3000/usuario/all"),
        ]);

        const clientesData = await clientesRes.json();
        const usuariosData = await usuariosRes.json();

        setClientes(clientesData);
        setUsuarios(usuariosData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  
  // 🔹 submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = project
        ? `http://localhost:3000/proyecto/update/${project._id}`
        : "http://localhost:3000/proyecto/create";

      const method = project ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      const proyectoId = result.result._id;

      // asignar responsables
      for (const userId of form.responsables) {
        await fetch("http://localhost:3000/proyecto-usuario/assign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proyecto: proyectoId,
            usuario: userId,
          }),
        });
      }

      onClose();
      onCreated();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="project-modal">
      <div className="project-modal-card">
        <h2>Detalles del proyecto</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) =>
              setForm({ ...form, nombre: e.target.value })
            }
          />

          <input
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) =>
              setForm({ ...form, descripcion: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Presupuesto"
            value={form.presupuesto}
            onChange={(e) =>
              setForm({ ...form, presupuesto: e.target.value })
            }
          />

          <select
            value={form.cliente}
            onChange={(e) =>
              setForm({ ...form, cliente: e.target.value })
            }
          >
            <option value="">Seleccionar cliente</option>
            {clientes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nombre}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.fechaInicio}
            onChange={(e) =>
              setForm({ ...form, fechaInicio: e.target.value })
            }
          />

          <input
            type="date"
            value={form.fechaLimite}
            onChange={(e) =>
              setForm({ ...form, fechaLimite: e.target.value })
            }
          />

          {/* RESPONSABLES */}
          <div>
            {usuarios.map((u) => (
              <label key={u._id}>
                <input
                  type="checkbox"
                  value={u._id}
                  checked={form.responsables.includes(u._id)} // 🔥 clave
                  onChange={(e) => {
                    const checked = e.target.checked;

                    setForm({
                      ...form,
                      responsables: checked
                        ? [...form.responsables, u._id]
                        : form.responsables.filter((id) => id !== u._id),
                    });
                  }}
                />
                {u.nombre}
              </label>
            ))}
          </div>

          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>

        </form>
      </div>
    </div>
  );
}

export default ProjectModal;