import { useEffect, useState, useRef } from "react";

import Select from "../common/Select";

import {
  RUBROS,
  ESTADOS_CLIENTE,
  PRIORIDADES_CLIENTE,
} from "../../constants/clientes.constants";

function ClientDetailsCard({
  cliente,
  setCliente,
}) {

  const [isEditing, setIsEditing] =
    useState(false);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    rubro: "",
    estado: "",
    prioridad: "",
    sitioWeb: "",
    pais: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    descripcion: "",
    logo: "",

    redes: {
      instagram: "",
      facebook: "",
      linkedin: "",
      tiktok: "",
    },
  });

  useEffect(() => {

    if (cliente) {

      setForm({
        nombre: cliente.nombre || "",
        email: cliente.email || "",
        telefono: cliente.telefono || "",
        rubro: cliente.rubro || "",
        estado: cliente.estado || "",
        prioridad: cliente.prioridad || "",
        sitioWeb: cliente.sitioWeb || "",
        pais: cliente.pais || "",
        provincia: cliente.provincia || "",
        ciudad: cliente.ciudad || "",
        direccion: cliente.direccion || "",
        descripcion: cliente.descripcion || "",
        logo: cliente.logo || "",

        redes: {
          instagram:
            cliente.redes?.instagram || "",

          facebook:
            cliente.redes?.facebook || "",

          linkedin:
            cliente.redes?.linkedin || "",

          tiktok:
            cliente.redes?.tiktok || "",
        },
      });
    }

  }, [cliente]);

  const handleChange = (
    field,
    value
  ) => {

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRedesChange = (
    field,
    value
  ) => {

    setForm((prev) => ({
      ...prev,

      redes: {
        ...prev.redes,
        [field]: value,
      },
    }));
  };

  // =========================
  // LOGO
  // =========================

  const handleLogoChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const preview =
      URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      logo: preview,
      logoFile: file,
    }));
  };

  const handleRemoveLogo = () => {

    setForm((prev) => ({
      ...prev,
      logo: "",
      logoFile: null,
    }));
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = async () => {

    try {

      let logoUrl = form.logo;

      // subir logo nuevo
      if (form.logoFile) {

        const data = new FormData();

        data.append(
          "file",
          form.logoFile
        );

        data.append(
          "upload_preset",
          "avatars"
        );

        const uploadRes = await fetch(
          "https://api.cloudinary.com/v1_1/dknuvc4jb/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const uploadData =
          await uploadRes.json();

        logoUrl =
          uploadData.secure_url;
      }

      const payload = {
        ...form,
        logo: logoUrl,
      };

      delete payload.logoFile;

      const res = await fetch(
        `http://localhost:3000/cliente/${cliente._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setCliente(data);

      setIsEditing(false);

    } catch (error) {

      console.error(error);
    }
  };

  const details = [
    ["Nombre", "nombre"],

    ["Email", "email"],

    ["Teléfono", "telefono"],

    [
      "Rubro",
      "rubro",
      "select",
      RUBROS,
    ],

    [
      "Estado",
      "estado",
      "select",
      ESTADOS_CLIENTE,
    ],

    [
      "Prioridad",
      "prioridad",
      "select",
      PRIORIDADES_CLIENTE,
    ],

    ["Sitio Web", "sitioWeb"],

    ["País", "pais"],

    ["Provincia", "provincia"],

    ["Ciudad", "ciudad"],

    ["Dirección", "direccion"],

    ["Descripción", "descripcion"],
  ];

  return (
    <div className="client-card">

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleLogoChange}
      />

      <div className="client-card-header">

        <div className="client-card-title">

          <i className="bi bi-building" />

          <span>Detalles</span>

        </div>

        {!isEditing ? (

          <button
            className="client-card-action"
            onClick={() =>
              setIsEditing(true)
            }
          >
            <i className="bi bi-pencil-square" />
          </button>

        ) : (

          <button
            className="client-save-btn"
            onClick={handleSave}
          >
            Listo
          </button>

        )}

      </div>

      <div className="client-card-divider" />

      {/* LOGO */}

      <div className="client-detail-row ">

        <span className="detail-label">
          Logo
        </span>

        <div className="client-logo-content">

          <div className="client-logo-preview">

            {form.logo ? (

              <img
                src={form.logo}
                alt="logo"
              />

            ) : (

              <i className="bi bi-image" />

            )}

          </div>

          {isEditing && (

            <div className="client-logo-actions">

              <button
                className="client-logo-btn"
                onClick={() =>
                  fileInputRef.current.click()
                }
              >
                Cambiar
              </button>

              <button
                className="client-logo-btn secondary"
                onClick={
                  handleRemoveLogo
                }
              >
                Borrar
              </button>

            </div>

          )}

        </div>

      </div>

      <div className="client-details-list">

        {details.map(
          ([
            label,
            field,
            type,
            options,
          ]) => (

            <div
              className="client-detail-row"
              key={field}
            >

              <span className="detail-label">
                {label}
              </span>

              {!isEditing ? (

                <span className="detail-value">
                  {form[field] || "-"}
                </span>

              ) : type === "select" ? (

                <Select
                  options={options}
                  value={form[field]}
                  onChange={(value) =>
                    handleChange(
                      field,
                      value
                    )
                  }
                  placeholder="Seleccionar"
                />

              ) : field ===
                "descripcion" ? (

                <textarea
                  className="client-detail-textarea"
                  value={form[field]}
                  onChange={(e) =>
                    handleChange(
                      field,
                      e.target.value
                    )
                  }
                />

              ) : (

                <input
                  className="client-detail-input"
                  value={form[field]}
                  onChange={(e) =>
                    handleChange(
                      field,
                      e.target.value
                    )
                  }
                />

              )}

            </div>

          )
        )}

        <div className="client-detail-section-title">
          Redes
        </div>

        {Object.entries(form.redes).map(
          ([key, value]) => (

            <div
              className="client-detail-row"
              key={key}
            >

              <span className="detail-label">
                {key}
              </span>

              {!isEditing ? (

                <span className="detail-value">
                  {value || "-"}
                </span>

              ) : (

                <input
                  className="client-detail-input"
                  value={value}
                  onChange={(e) =>
                    handleRedesChange(
                      key,
                      e.target.value
                    )
                  }
                />

              )}

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default ClientDetailsCard;