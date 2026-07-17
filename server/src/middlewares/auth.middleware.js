import jwt from "jsonwebtoken";
import  ApiResponse  from "../utils/ApiResponse.js";

// 1. Verify if the user is logged in
export const verifyJWT = (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(new ApiResponse(401, "Unauthorized request"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    req.user = decodedToken; // Contains userId and role from when we created the token
    next();
  } catch (error) {
    return res.status(401).json(new ApiResponse(401, "Invalid or expired token"));
  }
};

// 2. Verify if the user has the right role
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(req.user)
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json(
        new ApiResponse(403, `Role ${req.user.role} is not allowed to perform this action`)
      );
    }
    next();
  };
};