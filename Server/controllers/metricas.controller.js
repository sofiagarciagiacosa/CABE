import { getDashboardMetrics } from "../db/actions/metricas.actions.js";

export const dashboard = async (req, res) => {
  try {
    const period = req.query.period || "30 dias";

    const data = await getDashboardMetrics(period);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
