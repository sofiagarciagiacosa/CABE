import { useMemo, useState } from "react";

import "../../styles/forms.css";

import FormsHeader from "../../components/forms/FormsHeader";
import FormsStats from "../../components/forms/FormsStats";
import FormsToolbar from "../../components/forms/FormsToolbar";
import FormCardsGrid from "../../components/forms/FormCardsGrid";
import FormHistoryPanel from "../../components/forms/FormHistoryPanel";
import FormEditor from "../../components/forms/FormEditor";

const mockForms = [
  {
    id: 1,
    title: "Brief identidad visual",
    type: "Brief",
    status: "En revision",
    statusKey: "review",
    client: "Bruma Studio",
    project: "Rebranding integral",
    updatedAt: "Actualizado hoy",
    summary:
      "Objetivos, audiencia, tono y referencias para iniciar el proceso creativo.",
    icon: "bi-file-earmark-text",
    color: "red",
    nextStep:
      "Validar referencias visuales con direccion creativa antes de cerrar el brief.",
    history: [
      {
        date: "24 Jun",
        text: "Se cargo brief inicial y referencias de marca.",
      },
      {
        date: "26 Jun",
        text: "El cliente agrego objetivos comerciales del lanzamiento.",
      },
      {
        date: "30 Jun",
        text: "Pendiente revision de tono y publico objetivo.",
      },
    ],
  },
  {
    id: 2,
    title: "Propuesta campana invierno",
    type: "Propuesta",
    status: "Borrador",
    statusKey: "draft",
    client: "Casa Luma",
    project: "Campana temporada",
    updatedAt: "Hace 2 dias",
    summary:
      "Concepto, piezas sugeridas, calendario y presupuesto estimado para aprobacion.",
    icon: "bi-stars",
    color: "mustard",
    nextStep:
      "Completar presupuesto y sumar alternativas de pauta para presentar.",
    history: [
      {
        date: "18 Jun",
        text: "Se creo propuesta con lineamientos de temporada.",
      },
      {
        date: "25 Jun",
        text: "Se agregaron piezas de redes y direccion fotografica.",
      },
    ],
  },
  {
    id: 3,
    title: "Entrega final ecommerce",
    type: "Entrega final",
    status: "Aprobado",
    statusKey: "approved",
    client: "Nido Market",
    project: "Lanzamiento tienda",
    updatedAt: "Hace 1 semana",
    summary:
      "Registro de archivos entregados, enlaces finales y observaciones de cierre.",
    icon: "bi-check2-circle",
    color: "black",
    nextStep:
      "Archivar carpeta final cuando el cliente confirme la publicacion.",
    history: [
      {
        date: "04 Jun",
        text: "Se envio primera tanda de piezas para ecommerce.",
      },
      {
        date: "12 Jun",
        text: "Cliente aprobo banners y piezas de lanzamiento.",
      },
      {
        date: "20 Jun",
        text: "Se registro entrega final con links de Drive.",
      },
    ],
  },
  {
    id: 4,
    title: "Brief contenido mensual",
    type: "Brief",
    status: "Archivado",
    statusKey: "archived",
    client: "Casa Luma",
    project: "Contenido always on",
    updatedAt: "Hace 3 semanas",
    summary:
      "Necesidades de comunicacion mensual, fechas clave y prioridades de contenido.",
    icon: "bi-file-earmark-text",
    color: "beige",
    nextStep:
      "Usar como antecedente para el proximo calendario editorial.",
    history: [
      {
        date: "02 Jun",
        text: "Se documento calendario de contenidos del mes.",
      },
      {
        date: "10 Jun",
        text: "Se cerro brief y se vinculo al proyecto mensual.",
      },
    ],
  },
];

const initialFormData = {
  title: "Nuevo brief creativo",
  type: "Brief",
  client: "Bruma Studio",
  project: "Nuevo proyecto",
  status: "Borrador",
  brief: {
    objective:
      "Definir el objetivo principal del proyecto y el problema de comunicacion a resolver.",
    audience:
      "Describir segmento, intereses, comportamiento digital y necesidades principales.",
    tone:
      "Cercano, claro y sofisticado, alineado con la identidad de la marca.",
  },
  proposal: {
    concept:
      "Presentar una idea central que pueda expandirse en piezas graficas, audiovisuales y digitales.",
    pieces:
      "Moodboard, key visual, piezas para redes, adaptaciones y lineamientos de uso.",
    budget: "$ 450.000",
  },
  delivery: {
    assets:
      "Listado de archivos finales, formatos, versiones y responsables de aprobacion.",
    links: "https://drive.google.com/carpeta-del-proyecto",
    notes:
      "Registrar observaciones finales, pendientes menores y condiciones de cierre.",
  },
};

function FormsPage() {
  const [activeView, setActiveView] =
    useState("biblioteca");
  const [forms, setForms] =
    useState(mockForms);
  const [selectedFormId, setSelectedFormId] =
    useState(mockForms[0].id);
  const [search, setSearch] =
    useState("");
  const [filters, setFilters] =
    useState({
      type: "",
      status: "",
      client: "",
    });
  const [formData, setFormData] =
    useState(initialFormData);
  const [saveMessage, setSaveMessage] =
    useState("");

  const selectedForm = forms.find(
    (form) => form.id === selectedFormId
  );

  const filteredForms = useMemo(() => {
    return forms.filter((form) => {
      const searchMatch = [
        form.title,
        form.client,
        form.project,
        form.type,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const typeMatch =
        !filters.type ||
        form.type === filters.type;

      const statusMatch =
        !filters.status ||
        form.status === filters.status;

      const clientMatch =
        !filters.client ||
        form.client === filters.client;

      return (
        searchMatch &&
        typeMatch &&
        statusMatch &&
        clientMatch
      );
    });
  }, [forms, search, filters]);

  const stats = [
    {
      label: "Formularios",
      value: forms.length,
      icon: "bi-files",
      tone: "red",
    },
    {
      label: "En revision",
      value: forms.filter(
        (form) => form.status === "En revision"
      ).length,
      icon: "bi-clock-history",
      tone: "mustard",
    },
    {
      label: "Aprobados",
      value: forms.filter(
        (form) => form.status === "Aprobado"
      ).length,
      icon: "bi-check2",
      tone: "black",
    },
  ];

  const handleCreateForm = () => {
    setFormData({
      ...initialFormData,
      title: "Nuevo formulario digital",
      project: "Proyecto sin asignar",
    });
    setActiveView("editor");
    setSaveMessage("");
  };

  const handleEditForm = (formId) => {
    const formToEdit = forms.find(
      (form) => form.id === formId
    );

    if (!formToEdit) {
      return;
    }

    setSelectedFormId(formId);
    setFormData({
      ...initialFormData,
      title: formToEdit.title,
      type: formToEdit.type,
      client: formToEdit.client,
      project: formToEdit.project,
      status: formToEdit.status,
    });
    setActiveView("editor");
    setSaveMessage("");
  };

  const handleSaveDraft = () => {
    const newForm = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      status: formData.status,
      statusKey:
        formData.status === "Aprobado"
          ? "approved"
          : formData.status === "En revision"
            ? "review"
            : formData.status === "Archivado"
              ? "archived"
              : "draft",
      client: formData.client,
      project: formData.project,
      updatedAt: "Actualizado ahora",
      summary:
        "Formulario guardado localmente como mockup para validar el flujo del modulo.",
      icon:
        formData.type === "Propuesta"
          ? "bi-stars"
          : formData.type === "Entrega final"
            ? "bi-check2-circle"
            : "bi-file-earmark-text",
      color:
        formData.type === "Propuesta"
          ? "mustard"
          : formData.type === "Entrega final"
            ? "black"
            : "red",
      nextStep:
        "Conectar este flujo al backend para persistir formularios y archivos.",
      history: [
        {
          date: "Ahora",
          text: "Formulario creado desde el mockup del modulo.",
        },
      ],
    };

    setForms([newForm, ...forms]);
    setSelectedFormId(newForm.id);
    setSaveMessage(
      "Formulario guardado en memoria. Todavia no se envia al backend."
    );
  };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="forms-page">
      <FormsHeader
        activeView={activeView}
        setActiveView={setActiveView}
        onCreateForm={handleCreateForm}
      />

      {saveMessage && (
        <div className="forms-save-message">
          <i className="bi bi-info-circle" />
          {saveMessage}
        </div>
      )}

      <FormsStats stats={stats} />

      {activeView === "biblioteca" ? (
        <>
          <FormsToolbar
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
          />

          <div className="forms-library-layout">
            <FormCardsGrid
              forms={filteredForms}
              selectedFormId={selectedFormId}
              onSelectForm={setSelectedFormId}
              onEditForm={handleEditForm}
            />

            <FormHistoryPanel
              selectedForm={selectedForm}
            />
          </div>
        </>
      ) : (
        <FormEditor
          formData={formData}
          onChange={setFormData}
          onExportPdf={handleExportPdf}
          onSaveDraft={handleSaveDraft}
        />
      )}
    </div>
  );
}

export default FormsPage;
