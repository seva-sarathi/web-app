import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, phone, role } = req.body;

  const user = await authService.createUser(
    username,
    email,
    password,
    phone,
    role,
  );

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const { user, accessToken, refreshToken } = await authService.loginUser(
    username,
    password,
  );

  const cookieOptions = {
    httpOnly: true, // Prevents XSS attacks (client-side JS can't read it)
    secure: process.env.NODE_ENV === "production", // Must be true in production (HTTPS)
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  };

  res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user,
        accessToken, // Frontend stores this in memory (React context/Redux)
      }),
    );
});
