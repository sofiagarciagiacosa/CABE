import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import { getToken } from "../../utils/auth";

function AddUserModal({ onClose, onCreated }) {

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "", // id del rol
    puesto: "",
    activo: true,
  });
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const fetchRoles = async () => {
        try {
            const res = await fetch("http://localhost:3000/rol/all");
            const data = await res.json();
            setRoles(data);
        } catch (err) {
            console.error(err);
        }
    };

    fetchRoles();
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
  //  VALIDACIONES
  if (!form.nombre || !form.apellido || !form.email || !form.password) {
    alert("Completá todos los campos obligatorios");
    return;
  }

  if (!form.rol) {
    alert("Seleccioná un rol");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/usuario/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    onCreated();
    onClose();

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Nuevo usuario</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-divider" />

        <UserForm 
            form={form} 
            onChange={handleChange} 
            roles={roles}
        />

        <div className="modal-divider" />

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>

          <button className="save-btn" onClick={handleSave}>
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddUserModal;