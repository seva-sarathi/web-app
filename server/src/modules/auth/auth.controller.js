import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as authService from "./auth.service.js";



export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await authService.createUser(username, email, password);

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", user)
  );
});
