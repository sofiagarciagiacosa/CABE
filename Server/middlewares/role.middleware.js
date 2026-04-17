export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ error: "Sin permisos" });
    }
    next();
  };
};
