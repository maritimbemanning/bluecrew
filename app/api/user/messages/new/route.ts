import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

// POST - Start a new conversation
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subject } = await req.json();

    if (!subject || typeof subject !== "string") {
      return NextResponse.json({ error: "Subject is required" }, { status: 400 });
    }

    // Generate a temporary conversation ID
    // In production, this would insert into the conversations table
    const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    /*
    // TODO: Enable when conversations table exists
    const result = await insertSupabaseRow({
      table: "conversations",
      payload: {
        clerk_user_id: userId,
        subject,
        last_message: "",
        last_message_at: new Date().toISOString(),
        unread_count: 0,
      },
    });
    */

    logger.info("New conversation started", { userId, subject });

    return NextResponse.json({
      success: true,
      conversation_id: conversationId,
    });
  } catch (err) {
    logger.error("Failed to create conversation:", err);
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
  }
}
