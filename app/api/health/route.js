// app/api/health/route.js
export async function GET() {
  return Response.json({ status: "ok", port: process.env.PORT });
}
