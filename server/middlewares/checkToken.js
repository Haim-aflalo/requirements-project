import jwt from "jsonwebtoken";
import "dotenv/config";

export function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized. No token provided.",
    });
  }
  const token = authHeader.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden - Invalid or expired token",
    });
  }
}
