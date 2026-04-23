function UsersTable() {
  const user = {
    nombre: "Milagros Carranza",
    email: "sofia@gmail.com",
    rol: "Admin",
    puesto: "Dirección",
    activo: true,
    fecha: "17/04/2026",
  };

  return (
    <div className="users-table">

      {/* HEADER */}
      <div className="table-header">
        <span>Usuario</span>
        <span>Email</span>
        <span>Rol</span>
        <span>Puesto</span>
        <span>Estado</span>
        <span>Acciones</span>
        <span>Se unió</span>
      </div>

      {/* ROW */}
      <div className="table-row">

        <span>{user.nombre}</span>
        <span>{user.email}</span>
        <span>{user.rol}</span>
        <span>{user.puesto}</span>

        {/* 🔴 ESTADO */}
        <span className="status-cell">
          <i
            className={`bi ${
              user.activo ? "bi-toggle-on" : "bi-toggle-off"
            }`}
          ></i>
          {user.activo ? "Activo" : "Inactivo"}
        </span>

        {/* ⚙️ ACCIONES */}
        <span className="actions-cell">
          <i className="bi bi-pencil"></i>
          <i className="bi bi-trash"></i>
        </span>

        <span>{user.fecha}</span>
      </div>

    </div>
  );
}

export default UsersTable;