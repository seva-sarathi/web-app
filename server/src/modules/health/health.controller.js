import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const health = asyncHandler(async(req,res)=>{
    res.status(200)
    .json(
        new ApiResponse(200, "The API is working fine")
    )
})
import { db } from "../../database/db.js";

export const checkHealth = async (req, res) => {
  try {
    // A simple query to ensure the database connection is alive
    await db.query("SELECT 1");
    
    res.status(200).json(
      new ApiResponse(200, "System Systems Nominal", { status: "ONLINE", timestamp: new Date() })
    );
  } catch (error) {
    res.status(503).json(
      new ApiResponse(503, "Database connection degraded", { status: "DEGRADED" })
    );
  }
};