export function isAdmin(req, res, next) {
  const decoded = req.user;
  if (decoded.role !== "admin") {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
  next();
}
