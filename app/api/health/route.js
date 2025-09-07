// pages/api/health.js (or app/api/health/route.js for App Router)
export default function handler(req, res) {
  res.status(200).json({ status: "ok", port: process.env.PORT });
}
