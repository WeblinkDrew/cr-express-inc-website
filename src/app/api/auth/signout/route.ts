import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Clear Stack Auth cookies
  const cookieStore = await cookies();
  cookieStore.delete("stack-auth");
  cookieStore.delete("stack-refresh");

  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}