function TaskModal({
  show,
  onClose,
  onSave,
  form,
  setForm,
  usuarios,
  estados,
  urgencias,
  isEditing
}) {
  if (!show) return null;

  return (
    <div className="custom-modal">
      <div className="custom-modal-content">
        <h3>
          {isEditing ? "Editar tarea" : "Nueva tarea"}
        </h3>

        <input
          placeholder="Descripción"
          value={form.descripcion || ""}
          onChange={(e) =>
            setForm({ ...form, descripcion: e.target.value })
          }
        />

        <select
          value={form.idUsuario || ""}
          onChange={(e) =>
            setForm({ ...form, idUsuario: e.target.value })
          }
        >
          <option value="">Sin responsable</option>
          {usuarios.map((u) => (
            <option key={u._id} value={u._id}>
              {u.nombre}
            </option>
          ))}
        </select>

        <select
          value={form.idUrgencia || ""}
          onChange={(e) =>
            setForm({ ...form, idUrgencia: e.target.value })
          }
        >
          <option value="">Sin urgencia</option>
          {urgencias.map((u) => (
            <option key={u._id} value={u._id}>
              {u.nombre}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.fechaInicio || ""}
          onChange={(e) =>
            setForm({ ...form, fechaInicio: e.target.value })
          }
        />

        <input
          type="date"
          value={form.fechaLimite || ""}
          onChange={(e) =>
            setForm({ ...form, fechaLimite: e.target.value })
          }
        />

        <select
          value={form.idEstado || ""}
          onChange={(e) =>
            setForm({ ...form, idEstado: e.target.value })
          }
        >
          <option value="">Seleccionar estado</option>
          {estados.map((e) => (
            <option key={e._id} value={e._id}>
              {e.nombre}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={onSave}>Guardar tarea</button>
        </div>
      </div>
      
    </div>
  );
}

export default TaskModal;