import { useState } from "react";
import { getToken } from "../../utils/auth";
import Select from "../common/Select";

function UserRow({ user, roles, reload }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 🔴 TOGGLE ESTADO
  const toggleStatus = async () => {
    const confirm = window.confirm("¿Cambiar estado?");
    if (!confirm) return;

    await fetch(`http://localhost:3000/usuario/admin/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ activo: !user.activo }),
    });

    reload();
  };

  // 💾 GUARDAR
  const handleSave = async () => {
    const confirm = window.confirm("¿Guardar cambios?");
    if (!confirm) return;

    await fetch(`http://localhost:3000/usuario/admin/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        ...editedUser,
        rol: editedUser.rol._id || editedUser.rol,
      }),
    });

    setIsEditing(false);
    reload();
  };

  // ❌ CANCELAR
  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  // 🗑️ ELIMINAR
  const handleDelete = async () => {
    const confirm = window.confirm(
      "¿Eliminar usuario? Se desvinculará de proyectos y tareas"
    );
    if (!confirm) return;

    await fetch(`http://localhost:3000/usuario/admin/${user._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    reload();
  };

  return (
    <div className="table-row">

      {/* USUARIO */}
      {isEditing ? (
        <input
          value={editedUser.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
        />
      ) : (
        <span>{user.nombre} {user.apellido}</span>
      )}

      {/* EMAIL */}
      {isEditing ? (
        <input
          value={editedUser.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      ) : (
        <span>{user.email}</span>
      )}

      {/* ROL */}
      {isEditing ? (
        <Select
          options={roles}
          value={editedUser.rol._id || editedUser.rol}
          onChange={(value) => handleChange("rol", value)}
        />
      ) : (
        <span>{user.rol?.nombre}</span>
      )}

      {/* PUESTO */}
      {isEditing ? (
        <input
          value={editedUser.puesto || ""}
          onChange={(e) => handleChange("puesto", e.target.value)}
        />
      ) : (
        <span>{user.puesto}</span>
      )}

      {/* ESTADO */}
      <span className="status-cell" onClick={toggleStatus}>
        <i className={`bi ${user.activo ? "bi-toggle-on" : "bi-toggle-off"}`} />
        {user.activo ? "Activo" : "Inactivo"}
      </span>

      {/* ACCIONES */}
      <span className="actions-cell">
        {isEditing ? (
          <>
            <div className="action-btn save" onClick={handleSave}>
              <i className="bi bi-check"></i>
            </div>

            <div className="action-btn cancel" onClick={handleCancel}>
              <i className="bi bi-x"></i>
            </div>
          </>
        ) : (
          <>
            <div
              className="action-btn edit"
              onClick={() => setIsEditing(true)}
            >
              <i className="bi bi-pencil"></i>
            </div>

            <div className="action-btn delete" onClick={handleDelete}>
              <i className="bi bi-trash"></i>
            </div>
          </>
        )}
      </span>

      {/* FECHA */}
      <span>
        {new Date(user.createdAt).toLocaleDateString()}
      </span>

    </div>
  );
}

export default UserRow;