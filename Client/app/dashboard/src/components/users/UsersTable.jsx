import { useEffect, useState } from "react";
import { getToken } from "../../utils/auth";
import UserRow from "./UserRow";

function UsersTable({ refresh }) {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/usuario/all", {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch("http://localhost:3000/rol/all");
      const data = await res.json();
      setRoles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  const loadData = async () => {
    await fetchUsers();
    await fetchRoles();
  };

  loadData();
}, [refresh]);

  const reload = () => fetchUsers();

  return (
    <div className="users-table">

      <div className="table-header">
        <span>Usuario</span>
        <span>Email</span>
        <span>Rol</span>
        <span>Puesto</span>
        <span>Estado</span>
        <span>Acciones</span>
        <span>Se unió</span>
      </div>

      {users.map((user) => (
        <UserRow
          key={user._id}
          user={user}
          roles={roles}
          reload={reload}
        />
      ))}
    </div>
  );
}

export default UsersTable;