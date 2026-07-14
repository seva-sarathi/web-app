import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getUsers = asyncHandler(async (req, res) => {

    

    if (!users) {
        throw new ApiError(404, "Users not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            "Users fetched successfully",
            users
        )
    );
});

export const login = asyncHandler(async(req,res) => {
  const users = [];
  res.status(200).json(
        new ApiResponse(
            200,
            "User login successfully",
            users
        )
    );
})
export function health(req, res) {
  res.status(200).json(
    new ApiResponse(
      200,
      "auth route is healthy"
    )
  );
}