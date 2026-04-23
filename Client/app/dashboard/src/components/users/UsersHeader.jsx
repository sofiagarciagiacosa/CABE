function UsersHeader({ onAddUser }) {
  return (
    <div className="users-header">

      <div>
        <h2 className="users-title">Gestión de usuarios</h2>
        <p className="users-subtitle">
          Administra los miembros de tu equipo y su información
        </p>
      </div>

      <button className="add-user-btn" onClick={onAddUser}>
        Agregar Usuario
      </button>

    </div>
  );
}

export default UsersHeader;