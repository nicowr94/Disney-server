import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "Not token provided" });

    const decoded = jwt.verify(token, config.SECRET);

    // Validar si el id corresponde a un usuario
    const user = await User.findById(decoded.id);
    // const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "Not user token found" });

    // Validar si el token no ha expirado
    const now = Date.now().valueOf() / 1000;
    if (typeof decoded.exp !== "undefined" && decoded.exp < now)
      return res.status(404).json(`token expired: ${JSON.stringify(decoded)}`);

    if (typeof decoded.iat !== "undefined" && decoded.iat > now)
      return res.status(404).json(`token expired: ${JSON.stringify(decoded)}`);

    //continuar si el token es valido
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const verifyMyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const email = req.body.email;

    if (!token) return res.status(403).json({ message: "Not token provided" });

    const decoded = jwt.verify(token, config.SECRET);

    // Validar si el email corresponde al usuario
    const user = await User.findOne({ email: email });

    if (user.email != email)
      return res
        .status(404)
        .json({ message: "Email does not correspond to the token" });

    //continuar si el token es valido
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "Not token provided" });

  const decoded = jwt.verify(token, config.SECRET);
  const user = await User.findById(decoded.id);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require Admin role" });
};
