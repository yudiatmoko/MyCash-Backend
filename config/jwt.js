import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const secret = process.env.JWT_SECRET;

export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "48h" });
};

export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const protectedRoute = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Access denied, user not verified" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

export const decodeUserId = (token) => {
  try {
    const decoded = verifyToken(token);
    return decoded.id;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

export const getTokenFromHeader = (req) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
};
