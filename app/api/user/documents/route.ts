import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { selectSupabaseRows, insertSupabaseRow, uploadSupabaseObject } from "@/app/lib/server/supabase";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

type UserDocument = {
  id: string;
  clerk_user_id: string;
  type: string;
  name: string;
  filename: string;
  storage_key: string;
  expires_at: string | null;
  uploaded_at: string;
};

// GET - Fetch user's documents
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For now, return empty array - documents table needs to be created
    // In production, this would query the user_documents table
    const documents: UserDocument[] = [];

    /*
    // TODO: Enable when user_documents table exists
    const documents = await selectSupabaseRows<UserDocument>({
      table: "user_documents",
      columns: ["id", "type", "name", "filename", "storage_key", "expires_at", "uploaded_at"],
      filter: { clerk_user_id: userId },
      order: { column: "uploaded_at", ascending: false },
    });
    */

    return NextResponse.json({ documents });
  } catch (err) {
    logger.error("Failed to fetch documents:", err);
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

// POST - Upload new document
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const type = formData.get("type") as string;
    const name = formData.get("name") as string;
    const expiresAt = formData.get("expires_at") as string | null;
    const file = formData.get("file") as File;

    if (!type || !name || !file) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
    }

    // Generate storage key
    const timestamp = Date.now();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storageKey = `users/${userId}/documents/${timestamp}_${safeFilename}`;

    // Upload to storage
    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadSupabaseObject({
      bucket: "candidates-private",
      object: storageKey,
      body: buffer,
      contentType: "application/pdf",
    });

    /*
    // TODO: Enable when user_documents table exists
    await insertSupabaseRow({
      table: "user_documents",
      payload: {
        clerk_user_id: userId,
        type,
        name,
        filename: file.name,
        storage_key: storageKey,
        expires_at: expiresAt || null,
        uploaded_at: new Date().toISOString(),
      },
    });
    */

    logger.info("Document uploaded", { userId, type, name });

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("Failed to upload document:", err);
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 });
  }
}

// DELETE - Delete document
export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const docId = searchParams.get("id");

    if (!docId) {
      return NextResponse.json({ error: "Missing document ID" }, { status: 400 });
    }

    /*
    // TODO: Enable when user_documents table exists
    // First verify ownership
    const docs = await selectSupabaseRows<UserDocument>({
      table: "user_documents",
      columns: ["id", "storage_key"],
      filter: { id: docId, clerk_user_id: userId },
    });

    if (docs.length === 0) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Delete from storage
    await deleteSupabaseObject({
      bucket: "candidates-private",
      object: docs[0].storage_key,
    });

    // Delete from DB
    await deleteSupabaseRow({
      table: "user_documents",
      filter: { id: docId },
    });
    */

    logger.info("Document deleted", { userId, docId });

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("Failed to delete document:", err);
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}
