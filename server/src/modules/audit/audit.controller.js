import { db } from "../database/db.js";

/**
 * Middleware to automatically log system actions.
 * @param {string} action - The type of action (e.g., 'MANUAL_OVERRIDE', 'CREATE_USER')
 * @param {string} resource - The system component affected (e.g., 'AGV_FLEET', 'AUTH')
 */
export const logAction = (action, resource) => {
  return async (req, res, next) => {
    // Wait for the response to finish sending to the client
    res.on("finish", async () => {
      // Optional: Only log if the action was successful (Status 2xx or 3xx)
      // Remove this IF statement if you also want to log failed attempts
      if (res.statusCode >= 200 && res.statusCode < 400) {
        try {
          const userId = req.user?.id || null; // Requires verifyJWT to run before this
          const ipAddress = req.ip || req.headers["x-forwarded-for"] || "UNKNOWN";
          
          // Capture the request payload for context
          const details = {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            body: req.method !== "GET" ? { ...req.body } : null
          };

          // SECURITY: Never log passwords in plain text
          if (details.body && details.body.password) {
            details.body.password = "***MASKED***";
          }

          await db.query(
            `INSERT INTO audit_logs (user_id, action, resource, ip_address, details) 
             VALUES ($1, $2, $3, $4, $5)`,
            [userId, action, resource, ipAddress, JSON.stringify(details)]
          );
        } catch (error) {
          console.error("Audit Logger Failed:", error);
        }
      }
    });

    next();
  };
};