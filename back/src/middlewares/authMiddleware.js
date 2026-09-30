import jwt from "jsonwebtoken";

// Verificar token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensaje: "Token no proporcionado"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido o expirado"
    });
  }
};


// Verificar que sea cliente
export const isClient = (req, res, next) => {
  if (req.user.type !== "client") {
    return res.status(403).json({
      mensaje: "Acceso solo para clientes"
    });
  }

  next();
};


// Verificar que sea administrador
export const isAdmin = (req, res, next) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({
      mensaje: "Acceso solo para administradores"
    });
  }

  next();
};

// Verificar rol del administrador
export const checkAdminRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        mensaje: "No tiene permisos para acceder"
      });
    }

    next();
  };
};

