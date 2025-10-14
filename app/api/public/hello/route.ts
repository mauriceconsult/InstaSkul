// app/api/public/hello/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "👋 Hello from a public route!",
    time: new Date().toISOString(),
  });
}
