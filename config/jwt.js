import jwt from "jsonwebtoken";

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

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
