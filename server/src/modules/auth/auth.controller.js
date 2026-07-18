import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

import * as authService from "./auth.service.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, phone, role } = req.body;

  // 1. Create user and get token
  const { newUser, setupToken } = await authService.inviteUser(
    username,
    email,
    phone,
    role,
  );

  // 2. Create the frontend link (Assuming your frontend runs on localhost:3000)
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const setupLink = `${frontendUrl}/setup-password?token=${setupToken}`;

  // 3. Send the email
  const emailHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Set up your SevaSarathi account</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
        font-family: Arial, Helvetica, sans-serif;
        color: #111827;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      .preheader {
        display: none !important;
        visibility: hidden;
        opacity: 0;
        color: transparent;
        height: 0;
        width: 0;
        max-height: 0;
        max-width: 0;
        overflow: hidden;
      }
      .container {
        max-width: 640px;
        margin: 28px auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      }
      .header {
        padding: 24px 24px 16px;
        text-align: center;
        background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
      }
      .logo {
        height: 42px;
      }
      .content {
        padding: 32px 28px 24px;
      }
      h1 {
        font-size: 24px;
        margin: 0 0 8px;
        color: #0f172a;
      }
      p {
        margin: 0 0 14px;
        line-height: 1.6;
        color: #374151;
      }
      .muted {
        color: #6b7280;
        font-size: 14px;
      }
      .card {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 16px;
        margin: 20px 0;
      }
      .btn {
        display: inline-block;
        background: #2563eb;
        color: #ffffff !important;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 700;
      }
      .small {
        font-size: 13px;
        color: #4b5563;
      }
      .footer {
        padding: 20px 24px 28px;
        text-align: center;
        font-size: 12px;
        color: #94a3b8;
        background: #f8fafc;
      }
      @media (max-width: 480px) {
        .content { padding: 24px 18px 20px; }
        .btn { display: block; text-align: center; }
      }
    </style>
  </head>
  <body>
    <span class="preheader">Set your SevaSarathi password and activate your account — the link expires in 24 hours.</span>
    <div class="container" role="article" aria-label="SevaSarathi account setup">
      <div class="header">
        <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}" target="_blank" rel="noopener">
          <img src="${process.env.ASSET_URL || "https://via.placeholder.com/220x48?text=SevaSarathi"}" alt="SevaSarathi" class="logo">
        </a>
      </div>

      <div class="content">
        <h1>Welcome to SevaSarathi</h1>
        <p class="muted">Hello ${username}, an administrator has created an account for you.</p>

        <div class="card">
          <p class="small"><strong>Username:</strong> ${username}</p>
          <p class="small">This setup link will expire in 24 hours.</p>
        </div>

        <p>Click the button below to create your password and activate your account.</p>

        <p style="text-align:center; margin:24px 0;">
          <a href="${setupLink}" class="btn" target="_blank" rel="noopener noreferrer">Set My Password</a>
        </p>

        <p class="small">
          If the button does not work, copy and paste this URL into your browser:
          <br>
          <a href="${setupLink}" target="_blank" rel="noopener" style="color:#2563eb; word-break:break-all;">${setupLink}</a>
        </p>

        <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;">

        <p class="small">
          If you did not expect this email or need support, contact us at
          <a href="mailto:${process.env.SUPPORT_EMAIL || "support@sevasarathi.example"}" style="color:#2563eb;">${process.env.SUPPORT_EMAIL || "support@sevasarathi.example"}</a>.
        </p>
      </div>

      <div class="footer">
        SevaSarathi — Helping communities.<br>
        © ${new Date().getFullYear()} SevaSarathi. All rights reserved.
      </div>
    </div>
  </body>
</html>`;

  await sendEmail({
    to: email,
    subject: "Set up your SevaSarathi Account",
    html: emailHtml,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "User registered. Setup email sent successfully.",
        newUser,
      ),
    );
});

export const login = asyncHandler(async (req, res) => {
  console.log("hiiiiiiiii");
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

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user,
        accessToken, // Frontend stores this in memory (React context/Redux)
      }),
    );
});

export const setupPassword = asyncHandler( async(req,res)=>{
  const {password, token} = req.body;
    console.log("hello -2");

  if (!password || !token) {
    return res.status(400).json({ message: "Password and token are required" });
  }
  console.log("hello -1");

  const user = await authService.setupPasswordService(token, password);
    console.log("hello 0");

  return res.status(200)
          .json(
            new ApiResponse(200, "password change successfull!")
          );
})

import jwt from "jsonwebtoken";

export const refresh = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json(new ApiResponse(401, "Unauthorized request"));
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Fetch user details from DB using decodedToken.userId
    const query = `
      SELECT u.id, u.username, u.email, r.name AS role_name 
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = $1
    `;
    const result = await db.query(query, [decodedToken.userId]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json(new ApiResponse(401, "Invalid refresh token"));
    }

    // Generate new Access Token
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role_name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json(
      new ApiResponse(200, "Access token refreshed", { user, accessToken })
    );
  } catch (error) {
    return res.status(401).json(new ApiResponse(401, "Invalid or expired refresh token"));
  }
});