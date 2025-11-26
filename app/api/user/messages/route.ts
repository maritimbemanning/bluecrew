import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

// GET - Fetch user's conversations
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For now, return empty array - messages table needs to be created
    // In production, this would query the user_messages/conversations tables
    const conversations: unknown[] = [];

    /*
    // TODO: Enable when messages tables exist
    const conversations = await selectSupabaseRows({
      table: "conversations",
      columns: ["*"],
      filter: { clerk_user_id: userId },
      order: { column: "last_message_at", ascending: false },
    });

    // Fetch messages for each conversation
    for (const conv of conversations) {
      conv.messages = await selectSupabaseRows({
        table: "messages",
        columns: ["*"],
        filter: { conversation_id: conv.id },
        order: { column: "created_at", ascending: true },
      });
    }
    */

    return NextResponse.json({ conversations });
  } catch (err) {
    logger.error("Failed to fetch messages:", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// POST - Send a new message
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const conversationId = formData.get("conversation_id") as string;
    const content = formData.get("content") as string;
    const attachment = formData.get("attachment") as File | null;

    if (!conversationId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let attachmentData = null;
    if (attachment && attachment.size > 0) {
      // Upload attachment
      // TODO: Implement attachment upload
      attachmentData = {
        name: attachment.name,
        type: attachment.type,
        url: "#", // Would be signed URL from Supabase storage
      };
    }

    /*
    // TODO: Enable when messages table exists
    await insertSupabaseRow({
      table: "messages",
      payload: {
        conversation_id: conversationId,
        clerk_user_id: userId,
        from_user: true,
        content,
        attachment: attachmentData,
        created_at: new Date().toISOString(),
        read: false,
      },
    });

    // Update conversation last_message
    await updateSupabaseRow({
      table: "conversations",
      filter: { id: conversationId },
      payload: {
        last_message: content.substring(0, 100),
        last_message_at: new Date().toISOString(),
      },
    });
    */

    logger.info("Message sent", { userId, conversationId });

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("Failed to send message:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
