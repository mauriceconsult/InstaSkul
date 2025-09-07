// app/api/env/route.js
export async function GET() {
  return Response.json({ DATABASE_URL: process.env.DATABASE_URL });
}
