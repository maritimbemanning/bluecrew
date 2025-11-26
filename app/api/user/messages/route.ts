import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch user's messages
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("clerk_user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      // Table doesn't exist yet - return empty
      if (error.code === "42P01") {
        return NextResponse.json({ messages: [] });
      }
      throw error;
    }

    // Count unread messages
    const unreadCount = (messages || []).filter(m => m.sender === "bluecrew" && !m.read).length;

    return NextResponse.json({
      messages: messages || [],
      unreadCount
    });
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

    const body = await req.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Meldingen kan ikke være tom" }, { status: 400 });
    }

    // Insert message from user
    const { data: message, error } = await supabase
      .from("messages")
      .insert({
        clerk_user_id: userId,
        sender: "user",
        content: content.trim(),
      })
      .select()
      .single();

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json({ error: "Meldingssystem ikke konfigurert ennå" }, { status: 500 });
      }
      throw error;
    }

    logger.info("Message sent", { userId, messageId: message.id });

    return NextResponse.json({ success: true, message });
  } catch (err) {
    logger.error("Failed to send message:", err);
    return NextResponse.json({ error: "Kunne ikke sende melding" }, { status: 500 });
  }
}

// PATCH - Mark messages as read
export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mark all unread messages from Bluecrew as read
    const { error } = await supabase
      .from("messages")
      .update({
        read: true,
        read_at: new Date().toISOString()
      })
      .eq("clerk_user_id", userId)
      .eq("sender", "bluecrew")
      .eq("read", false);

    if (error && error.code !== "42P01") {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("Failed to mark messages as read:", err);
    return NextResponse.json({ error: "Kunne ikke markere meldinger som lest" }, { status: 500 });
  }
}
