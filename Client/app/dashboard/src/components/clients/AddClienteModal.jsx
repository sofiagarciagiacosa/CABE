import { useState } from "react";

import ClienteGeneralSection from "./ClienteGeneralSection";
import ClienteMarketingSection from "./ClienteMarketingSection";
import ClienteLocationSection from "./ClienteLocationSection";
import ClienteContactsSection from "./ClienteContactsSection";

import {
  RUBROS,
  ESTADOS_CLIENTE,
  PRIORIDADES_CLIENTE,
} from "../../constants/clientes.constants";

function AddClienteModal({ onClose }) {

  const [activeSection, setActiveSection] = useState("general");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    sitioWeb: "",

    rubro: "Otro",
    estado: "Prospecto",
    prioridad: "Media",

    descripcion: "",
    logo: "",

    redes: {
      instagram: "",
      facebook: "",
      linkedin: "",
      tiktok: "",
    },

    pais: "",
    provincia: "",
    ciudad: "",
    direccion: "",

    contactos: [],
  });

  // =========================
  // ACCORDION
  // =========================

  const toggleSection = (section) => {

    setActiveSection((prev) =>
      prev === section ? null : section
    );
  };

  // =========================
  // HANDLERS
  // =========================

  const handleChange = (field, value) => {

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRedesChange = (field, value) => {

    setForm((prev) => ({
      ...prev,

      redes: {
        ...prev.redes,
        [field]: value,
      },
    }));
  };

  const handleContactoChange = (index, field, value) => {

    const updated = [...form.contactos];

    updated[index][field] = value;

    setForm((prev) => ({
      ...prev,
      contactos: updated,
    }));
  };

  const addContacto = () => {

    setForm((prev) => ({
      ...prev,

      contactos: [
        ...prev.contactos,

        {
          nombre: "",
          email: "",
          telefono: "",
          cargo: "",
          principal: false,
        },
      ],
    }));
  };

  const removeContacto = (index) => {

    setForm((prev) => ({
      ...prev,
      contactos: prev.contactos.filter((_, i) => i !== index),
    }));
  };

  // =========================
  // VALIDACIONES
  // =========================

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = async () => {

    setError("");

    if (!form.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    if (form.email && !isValidEmail(form.email)) {
      setError("Ingresá un email válido");
      return;
    }

    const invalidContact = form.contactos.find(
      (contacto) =>
        contacto.email &&
        !isValidEmail(contacto.email)
    );

    if (invalidContact) {
      setError("Uno de los contactos tiene un email inválido");
      return;
    }

    try {

      const res = await fetch("http://localhost:3000/cliente", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al crear cliente");
        return;
      }

      onClose();

    } catch (err) {

      console.error(err);

      setError("Error al crear cliente");
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal-card cliente-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}

        <div className="modal-header">

          <h2>Nuevo Cliente</h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="modal-divider" />

        {/* ERROR */}

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {/* GENERAL */}

        <ClienteGeneralSection
          activeSection={activeSection}
          toggleSection={toggleSection}
          form={form}
          handleChange={handleChange}
          rubros={RUBROS}
          estados={ESTADOS_CLIENTE}
          prioridades={PRIORIDADES_CLIENTE}
        />

        <div className="modal-divider" />

        {/* MARKETING */}

        <ClienteMarketingSection
          activeSection={activeSection}
          toggleSection={toggleSection}
          form={form}
          handleChange={handleChange}
          handleRedesChange={handleRedesChange}
        />

        <div className="modal-divider" />

        {/* LOCATION */}

        <div className="accordion-section">

          <button
            type="button"
            className="accordion-header"
            onClick={() => toggleSection("location")}
          >
            <span>Ubicación</span>

            <i
              className={`bi bi-chevron-${
                activeSection === "location"
                  ? "up"
                  : "down"
              }`}
            />
          </button>

          {activeSection === "location" && (

            <ClienteLocationSection
              form={form}
              handleChange={handleChange}
            />

          )}

        </div>

        <div className="modal-divider" />

        {/* CONTACTOS */}

        <div className="accordion-section">

          <button
            type="button"
            className="accordion-header"
            onClick={() => toggleSection("contacts")}
          >
            <span>Contactos</span>

            <i
              className={`bi bi-chevron-${
                activeSection === "contacts"
                  ? "up"
                  : "down"
              }`}
            />
          </button>

          {activeSection === "contacts" && (

            <ClienteContactsSection
              form={form}
              addContacto={addContacto}
              removeContacto={removeContacto}
              handleContactoChange={handleContactoChange}
            />

          )}

        </div>

        <div className="modal-divider" />

        {/* FOOTER */}

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Guardar
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddClienteModal;