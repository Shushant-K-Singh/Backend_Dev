const jwt = require("jsonwebtoken");
const { readStore } = require("../services/store");
const { toPublicUser } = require("../utils/serializers");
const httpError = require("../utils/httpError");

const jwtSecret = process.env.JWT_SECRET || "local-dev-secret-change-me";

function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(httpError(401, "Authorization token is required"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, jwtSecret);

    const store = readStore();
    const user = store.users.find(
      (candidate) => candidate.id === payload.sub
    );

    if (!user) {
      return next(httpError(401, "User not found (token invalid)"));
    }

    req.user = toPublicUser(user);

    return next();
  } catch (err) {
    return next(httpError(401, "Invalid or expired token"));
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return next(httpError(403, "Admin access required"));
  }

  return next();
}


function requireOwnerOrAdmin(getOwnerId) {
  return (req, res, next) => {
    const ownerId = getOwnerId(req);

    if (!req.user) {
      return next(httpError(401, "Unauthorized"));
    }

    if (req.user.id !== ownerId && req.user.role !== "admin") {
      return next(httpError(403, "Not allowed"));
    }

    return next();
  };
}

module.exports = {
  protect,
  requireAdmin,
  requireOwnerOrAdmin,
  jwtSecret,
};
