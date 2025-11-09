import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/lib/stack";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ error: "Form name is required" }, { status: 400 });
    }

    // Generate slug: convert name to slug format + random string
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const randomString = crypto.randomBytes(4).toString("hex");
    const slug = `${baseSlug}-${randomString}`;

    // Create the form
    const form = await prisma.form.create({
      data: {
        name,
        slug,
        description: description || null,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      form,
    });
  } catch (error: any) {
    console.error("Error creating form:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create form" },
      { status: 500 }
    );
  }
}
