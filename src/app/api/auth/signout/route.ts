import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Clear Stack Auth cookies
    const cookieStore = await cookies();

    // Delete all possible Stack Auth related cookies with proper options
    const cookiesToDelete = [
      'stack-auth',
      'stack-refresh',
      'stack-auth-token',
      'stack-refresh-token',
      'stack.access-token',
      'stack.refresh-token'
    ];

    for (const cookieName of cookiesToDelete) {
      cookieStore.set(cookieName, '', {
        expires: new Date(0),
        path: '/',
        httpOnly: true,
        sameSite: 'lax'
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signout error:", error);
    // Return success even on error to ensure client-side redirect happens
    return NextResponse.json({ success: true });
  }
}

// Also handle GET requests for backward compatibility
export async function GET() {
  return POST();
}