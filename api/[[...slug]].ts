import type { VercelRequest, VercelResponse } from "@vercel/node";

// Simple API handler for Vercel
// This redirects API requests to the external API server or handles them locally
export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  // Handle OPTIONS requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // For now, return a placeholder response
  // In production, you would either:
  // 1. Use an external API service
  // 2. Import and run the Express app
  // 3. Use a database connection directly
  res.status(501).json({
    error: "API not yet configured",
    message:
      "Configure your API backend (external service, database, or local functions)",
  });
}
