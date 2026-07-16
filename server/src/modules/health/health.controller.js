import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const health = asyncHandler(async(req,res)=>{
    res.status(200)
    .json(
        new ApiResponse(200, "The API is working fine")
    )
})