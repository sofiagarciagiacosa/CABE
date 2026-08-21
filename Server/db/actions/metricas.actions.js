import { connectDB } from "../connection.js";
import Proyecto from "../schemas/proyecto.schema.js";
import Cliente from "../schemas/cliente.schema.js";
import Tarea from "../schemas/tarea.schema.js";
import Estado from "../schemas/estado.schema.js";

const CARD_CONFIG = {
  activeProjects: {
    title: "Proyectos activos",
    icon: "bi-kanban",
    
  },

  activeClients: {
    title: "Clientes activos",
    icon: "bi-people",
  },

  estimatedRevenue: {
    title: "Ingresos estimados",
    icon: "bi-cash-stack",
  },

  overdueTasks: {
    title: "Tareas vencidas",
    icon: "bi-exclamation-circle",
  },

  completionRate: {
    title: "Cumplimiento",
    icon: "bi-graph-up-arrow",
  },
};
const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
function getStartDate(period) {
  const today = new Date();

  switch (period) {
    case "Anual":
      
      return new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate(),
      );

    case "Trimestre":
      return new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate(),
      );

    case "30 dias":
    default:
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 30,
      );
  }
}
function getPeriodConfig(period) {
  const today = new Date();
  switch (period) {
    case "Anual":
      return {
        startDate: new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate(),
        ),
        type: "month",
        points: 12,
      };

    case "Trimestre":
      return {
        startDate: new Date(
          today.getFullYear(),
          today.getMonth() - 3,
          today.getDate(),
        ),
        type: "month",
        points: 3,
      };

    case "30 dias":
    default:
      return {
        startDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 30,
        ),
        type: "week",
        points: 5,
      };
  }
}
async function getActiveProjects(period) {
  const startDate = getStartDate(period);
  const total = await Proyecto.countDocuments({
    estado: {
      $in: ["Planificado", "En progreso", "En revisión"],
    },
    fechaInicio: {
      $gte: startDate,
    },
  });

  return {
    id: "active-projects",

    ...CARD_CONFIG.activeProjects,

    value: total,

    change: 0,

    period: "",

    positive: true,
  };
}
async function getProjectsByStatus(period) {
  const startDate = getPeriodConfig(period).startDate;
  const result = await Proyecto.aggregate([
    {
      $match: {
        fechaInicio: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: "$estado",
        value: {
          $sum: 1,
        },
      },
    },
  ]);
  const STATUS_COLORS = {
    Planificado: "#7C8CF8",
    "En progreso": "#4F8EF7",
    "En revisión": "#F4C95D",
    Pausado: "#C5CBD3",
    Finalizado: "#45C486",
    Cancelado: "#6B7280",
  };

  return result.map((item) => ({
    label: item._id,

    value: item.value,

    color: STATUS_COLORS[item._id],
  }));
}
async function getMonthlyProjects(period) {
  const today = new Date();
  const config = getPeriodConfig(period);
  const startDate = config.startDate;

  const proyectos = await Proyecto.find({
    fechaInicio: {
      $gte: startDate,
    },
  });

  const chart = [];

  // =========================
  // Últimos 30 días (semanas)
  // =========================
  if (config.type === "week") {
    const weekRanges = [];

    for (let i = config.points - 1; i >= 0; i--) {
      const end = new Date(today);
      end.setDate(today.getDate() - i * 7);

      const start = new Date(end);
      start.setDate(end.getDate() - 6);

      if (start < startDate) {
        start.setTime(startDate.getTime());
      }

      weekRanges.push({
        start,
        end,
      });
    }

    weekRanges.forEach((week, index) => {
      const total = proyectos.filter((proyecto) => {
        return (
          proyecto.fechaInicio >= week.start && proyecto.fechaInicio <= week.end
        );
      }).length;

      const startMonth = MONTHS[week.start.getMonth()];
      const endMonth = MONTHS[week.end.getMonth()];

      let label;

      if (startMonth === endMonth) {
        // Ej: 10-16 Jun
        label = `${week.start.getDate()}-${week.end.getDate()} ${startMonth}`;
      } else {
        // Ej: 28 Jun-4 Jul
        label = `${week.start.getDate()} ${startMonth}-${week.end.getDate()} ${endMonth}`;
      }

      chart.push({
        label,
        value: total,
      });
    });
  }

  // =========================
  // Trimestre / Anual (meses)
  // =========================
  if (config.type === "month") {
    const result = await Proyecto.aggregate([
      {
        $match: {
          fechaInicio: {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$fechaInicio" },
            month: { $month: "$fechaInicio" },
          },
          value: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    for (let i = config.points - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const found = result.find(
        (item) => item._id.month === month && item._id.year === year,
      );

      chart.push({
        label: MONTHS[month - 1],
        value: found ? found.value : 0,
      });
    }
  }

  return chart;
}
async function getActiveClients(period) {
  const total = await Cliente.countDocuments({
    estado: "Cliente Activo",
  });

  return {
    id: "active-clients",

    ...CARD_CONFIG.activeClients,

    value: total,

    change: 0,

    period: "",

    positive: true,
  };
}
async function getClientsByIndustry(period) {
  const startDate = getPeriodConfig(period).startDate;
 
  const result = await Proyecto.aggregate([
    {
      $match: {
        fechaInicio: {
          $gte: startDate,
        },
      },
    },

    {
      $lookup: {
        from: "clientes",
        localField: "cliente",
        foreignField: "_id",
        as: "cliente",
      },
    },
    {
      $unwind: "$cliente",
    },
    {
      $group: {
        _id: "$cliente.rubro",
        value: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        value: -1,
      },
    },
  ]);
  

  const INDUSTRY_COLORS = {
    Tecnología: "#4F8EF7",
    Marketing: "#7C8CF8",
    Moda: "#F4C95D",
    Gastronomía: "#45C486",
    Educación: "#FF9E57",
    Salud: "#FF6B6B",
    Inmobiliaria: "#B48CF2",
    "E-commerce": "#6EC6FF",
    Otro: "#C5CBD3",
  };

  return result.map((item) => ({
    label: item._id,
    value: item.value,
    color: INDUSTRY_COLORS[item._id] ?? "#C5CBD3",
  }));
}
async function getTopClients(period) {
  const startDate = getStartDate(period);
  const result = await Proyecto.aggregate([
    {
      $match: {
        fechaInicio: {
          $gte: startDate,
        },
      },
    },
    {
      $lookup: {
        from: "clientes",
        localField: "cliente",
        foreignField: "_id",
        as: "cliente",
      },
    },
    {
      $unwind: "$cliente",
    },
    {
      $group: {
        _id: "$cliente._id",
        nombre: {
          $first: "$cliente.nombre",
        },
        value: {
          $sum: "$presupuesto",
        },
      },
    },
    {
      $sort: {
        value: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  const COLORS = ["#4F8EF7", "#7C8CF8", "#45C486", "#F4C95D", "#FF9E57"];

  return result.map((item, index) => ({
    label: item.nombre,

    value: item.value,

    displayValue: new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(item.value),

    color: COLORS[index],
  }));
}

async function getEstimatedRevenue(period) {
  const startDate = getStartDate(period);
  const result = await Proyecto.aggregate([
    {
      $match: {
        fechaInicio: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$presupuesto",
        },
      },
    },
  ]);

  const total = result[0]?.total ?? 0;

  return {
    id: "estimated-revenue",

    ...CARD_CONFIG.estimatedRevenue,

    value: new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(total),

    change: 0,

    period: "",

    positive: true,
  };
}
async function getEstimatedRevenueChart(period) {
  const today = new Date();
  const config = getPeriodConfig(period);
  const startDate = config.startDate;

  const result = await Proyecto.aggregate([
    {
      $match: {
        fechaInicio: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$fechaInicio",
          },
          month: {
            $month: "$fechaInicio",
          },
        },
        value: {
          $sum: "$presupuesto",
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const chart = [];
  if (config.type === "week") {
    const proyectos = await Proyecto.find({
      fechaInicio: {
        $gte: startDate,
      },
    });

    for (let i = 4; i >= 0; i--) {
      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() - i * 7);

      const weekStart = new Date(weekEnd);
      weekStart.setDate(weekEnd.getDate() - 6);

      const total = proyectos
        .filter(
          (proyecto) =>
            proyecto.fechaInicio >= weekStart &&
            proyecto.fechaInicio <= weekEnd,
        )
        .reduce((sum, proyecto) => sum + proyecto.presupuesto, 0);

      chart.push({
        label: `${weekStart.getDate()}-${weekEnd.getDate()} ${
          MONTHS[weekEnd.getMonth()]
        }`,

        value: total,

        displayValue: new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(total),

        color: i === 0 ? "#45C486" : "#4F8EF7",
      });
    }
  }

  if (config.type === "month") {
    for (let i = config.points - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const found = result.find(
        (item) => item._id.month === month && item._id.year === year,
      );

      const value = found ? found.value : 0;

      chart.push({
        label: MONTHS[month - 1],
        value,
        displayValue: new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(value),
        color: month === today.getMonth() + 1 ? "#45C486" : "#4F8EF7",
      });
    }
  }

  return chart;
}
async function getServices(period) {
  const startDate = getStartDate(period);
  const result = await Proyecto.aggregate([
    {
      $match: {
        fechaInicio: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: "$tipoServicio",

        value: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        value: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  const COLORS = ["#4F8EF7", "#7C8CF8", "#45C486", "#F4C95D", "#FF9E57"];

  return result.map((item, index) => ({
    label: item._id,

    value: item.value,

    displayValue: item.value + (item.value === 1 ? " proyecto" : " proyectos"),

    color: COLORS[index],
  }));
}
async function getOverdueTasks(period) {
  const today = new Date();

  const estadoHecho = await Estado.findOne({
    nombre: "Hecho",
  });

  const filtro = {
    fechaLimite: { $lt: today },
  };

  if (estadoHecho) {
    filtro.idEstado = {
      $ne: estadoHecho._id,
    };
  }

  const total = await Tarea.countDocuments(filtro);

  return {
    id: "overdue-tasks",

    ...CARD_CONFIG.overdueTasks,

    value: total,

    change: null,

    period: "",

    positive: total === 0,
  };
}

async function getCompletionRate(period) {
  const result = await Proyecto.aggregate([
    {
      $match: {
        estado: {
          $in: ["Planificado", "En progreso", "En revisión"],
        },
      },
    },
    {
      $group: {
        _id: null,
        promedio: {
          $avg: "$progreso",
        },
      },
    },
  ]);

  const completion = Math.round(result[0]?.promedio ?? 0);

  return {
    id: "completion-rate",

    ...CARD_CONFIG.completionRate,

    value: `${completion}%`,

    change: 0,

    period: "",

    positive: completion >= 80,
  };
}

export async function getDashboardMetrics(period) {
  try {
    await connectDB();
    
    const cards = [];


    cards.push(await getActiveProjects(period));
    cards.push(await getActiveClients(period));
    cards.push(await getEstimatedRevenue(period));
    cards.push(await getOverdueTasks(period));
    cards.push(await getCompletionRate(period));

    return {
      cards,

      charts: {
        projectStatus: await getProjectsByStatus(period),
        monthlyProjects: await getMonthlyProjects(period),
        clientsByIndustry: await getClientsByIndustry(period),
        topClients: await getTopClients(period),
        estimatedRevenue: await getEstimatedRevenueChart(period),
        services: await getServices(period),
      },

      summary: {},
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
