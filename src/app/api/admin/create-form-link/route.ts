import { NextResponse } from "next/server";
import { stackServerApp } from "@/lib/stack";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST() {
  try {
    // Check if user is authenticated
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create a new form link
    const formLink = await prisma.formLink.create({
      data: {
        token: uuidv4(),
        createdByUserId: user.id,
        expiresAt: null, // No expiration by default
        maxUses: 1, // One-time use
        usedCount: 0,
        isActive: true,
      },
    });

    console.log("✅ Form link created:", formLink.token);

    return NextResponse.json({ success: true, formLink }, { status: 201 });
  } catch (error) {
    console.error("Error creating form link:", error);
    return NextResponse.json(
      { error: "Failed to create form link" },
      { status: 500 }
    );
  }
}
