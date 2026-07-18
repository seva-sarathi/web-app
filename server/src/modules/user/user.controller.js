import { db } from "../../database/db.js";
import ApiResponse from "../../utils/ApiResponse.js";
import  asyncHandler  from "../../utils/asyncHandler.js"; // Assuming you use an asyncHandler wrapper

export const getAllUsers = asyncHandler(async (req, res) => {
  // Fetch users and join with the roles table to get the actual role names (ADMIN, CONTROLLER, USER)
  // Exclude password_hash for security
  const query = `
    SELECT 
      u.id, 
      u.username, 
      u.email, 
      u.is_active, 
      r.name AS role_name 
    FROM users u
    JOIN roles r ON u.role_id = r.id
    ORDER BY u.created_at DESC
  `;
  
  const result = await db.query(query);

  // Send the array of users inside the standard ApiResponse format.
  // The frontend expects this to be in response.data.data
  res.status(200).json(
    new ApiResponse(200, "System users fetched successfully", result.rows)
  );
});