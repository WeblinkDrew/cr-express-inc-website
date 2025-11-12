import { stackServerApp } from "@/lib/stack";
import { NextResponse } from "next/server";

/**
 * Authentication and Authorization Utilities
 *
 * Provides centralized authentication checks for API routes.
 */

export interface AuthUser {
  id: string;
  displayName: string | null;
  primaryEmail: string | null;
  primaryEmailVerified: boolean;
  profileImageUrl: string | null;
}

/**
 * Verify user is authenticated
 * Returns user object if authenticated, throws error if not
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await stackServerApp.getUser();

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  return {
    id: user.id,
    displayName: user.displayName,
    primaryEmail: user.primaryEmail,
    primaryEmailVerified: user.primaryEmailVerified,
    profileImageUrl: user.profileImageUrl,
  };
}

/**
 * Check if user is authenticated (non-throwing version)
 * Returns user object or null
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      displayName: user.displayName,
      primaryEmail: user.primaryEmail,
      primaryEmailVerified: user.primaryEmailVerified,
      profileImageUrl: user.profileImageUrl,
    };
  } catch (error) {
    console.error("Error getting auth user:", error);
    return null;
  }
}

/**
 * Verify user has verified email
 * Returns user object if verified, throws error if not
 */
export async function requireVerifiedEmail(): Promise<AuthUser> {
  const user = await requireAuth();

  if (!user.primaryEmailVerified) {
    throw new Error("EMAIL_NOT_VERIFIED");
  }

  return user;
}

/**
 * Verify user is an admin
 * For now, checks if email ends with @crexpressinc.com
 * TODO: Implement proper role-based access control in database
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth();

  // Check if user is admin (domain-based for now)
  const isAdmin = user.primaryEmail?.toLowerCase().endsWith("@crexpressinc.com");

  if (!isAdmin) {
    throw new Error("FORBIDDEN");
  }

  return user;
}

/**
 * Handle auth errors consistently
 * Converts auth errors to appropriate HTTP responses
 */
export function handleAuthError(error: any): NextResponse {
  const errorMessage = error.message || "Authentication failed";

  switch (errorMessage) {
    case "UNAUTHORIZED":
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );

    case "EMAIL_NOT_VERIFIED":
      return NextResponse.json(
        { error: "Email verification required" },
        { status: 403 }
      );

    case "FORBIDDEN":
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );

    default:
      console.error("Auth error:", error);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 500 }
      );
  }
}

/**
 * Wrapper for API routes that require authentication
 * Usage:
 *   export const GET = withAuth(async (request, user) => {
 *     // user is guaranteed to be authenticated
 *     return NextResponse.json({ data: "..." });
 *   });
 */
export function withAuth(
  handler: (request: Request, user: AuthUser, ...args: any[]) => Promise<Response>
) {
  return async (request: Request, ...args: any[]): Promise<Response> => {
    try {
      const user = await requireAuth();
      return await handler(request, user, ...args);
    } catch (error) {
      return handleAuthError(error);
    }
  };
}

/**
 * Wrapper for API routes that require admin access
 */
export function withAdmin(
  handler: (request: Request, user: AuthUser, ...args: any[]) => Promise<Response>
) {
  return async (request: Request, ...args: any[]): Promise<Response> => {
    try {
      const user = await requireAdmin();
      return await handler(request, user, ...args);
    } catch (error) {
      return handleAuthError(error);
    }
  };
}
