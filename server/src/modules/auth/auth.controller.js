import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as authService from "./auth.service.js";
import { sendEmail } from "../../utils/sendEmail.js";


export const register = asyncHandler(async (req, res) => {
  const { username, email, password, phone, role } = req.body;

  // 1. Create user and get token
  const { newUser, setupToken } = await authService.inviteUser(username, email, phone, role);

  // 2. Create the frontend link (Assuming your frontend runs on localhost:3000)
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const setupLink = `${frontendUrl}/setup-password?token=${setupToken}`;

  // 3. Send the email
  const emailHtml = `
    <h2>Welcome to SevaSarathi</h2>
    <p>Hello,</p>
    <p>An administrator has created an account for you.</p>
    <p><b>Your Username:</b> ${username}</p>
    <p>Please click the link below to set your password and activate your account. This link expires in 24 hours.</p>
    <a href="${setupLink}" style="padding: 10px 20px; background: #2980b9; color: white; text-decoration: none; border-radius: 5px;">Set My Password</a>
  `;

  await sendEmail({
    to: email,
    subject: "Set up your SevaSarathi Account",
    html: emailHtml,
  });

  res.status(201).json(
    new ApiResponse(201, "User registered. Setup email sent successfully.", newUser)
  );
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
