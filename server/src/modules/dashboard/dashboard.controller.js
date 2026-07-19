import { db } from "../../database/db.js";
import ApiResponse from "../../utils/ApiResponse.js";
import  asyncHandler  from "../../utils/asyncHandler.js";

export const getDashboardSummary = asyncHandler(async (req, res) => {
  // Execute parallel PostgreSQL queries for optimal performance
  const [agvResult, requestResult, completedResult] = await Promise.all([
    db.query(`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'MOVING' OR status = 'DELIVERING') as active_agvs,
        COUNT(*) FILTER (WHERE status = 'IDLE' OR status = 'CHARGING') as idle_agvs
      FROM agvs
    `),
    db.query(`
      SELECT COUNT(*) as active_requests 
      FROM delivery_requests 
      WHERE status IN ('PENDING', 'APPROVED', 'ASSIGNED', 'IN_PROGRESS')
    `),
    db.query(`
      SELECT COUNT(*) as completed_today 
      FROM delivery_requests 
      WHERE status = 'COMPLETED' 
      AND created_at >= CURRENT_DATE
    `)
  ]);

  // Parse the string results returned by PostgreSQL COUNT() into integers
  const telemetryData = {
    activeAgvs: parseInt(agvResult.rows[0].active_agvs) || 0,
    idleAgvs: parseInt(agvResult.rows[0].idle_agvs) || 0,
    activeRequests: parseInt(requestResult.rows[0].active_requests) || 0,
    completedToday: parseInt(completedResult.rows[0].completed_today) || 0,
  };

  res.status(200).json(
    new ApiResponse(200, "Dashboard telemetry fetched successfully", telemetryData)
  );
});