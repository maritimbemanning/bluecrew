import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { logger } from "@/app/lib/logger";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch user's documents
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: documents, error } = await supabase
      .from("user_documents")
      .select("id, type, name, filename, storage_path, expires_at, uploaded_at")
      .eq("clerk_user_id", userId)
      .order("uploaded_at", { ascending: false });

    if (error) {
      // Table doesn't exist yet - return empty
      if (error.code === "42P01") {
        return NextResponse.json({ documents: [] });
      }
      throw error;
    }

    // Generate signed URLs for documents
    const docsWithUrls = await Promise.all(
      (documents || []).map(async (doc) => {
        let url = null;
        if (doc.storage_path) {
          const { data } = await supabase.storage
            .from("candidates-private")
            .createSignedUrl(doc.storage_path, 3600); // 1 hour
          url = data?.signedUrl || null;
        }
        return { ...doc, url };
      })
    );

    return NextResponse.json({ documents: docsWithUrls });
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
      return NextResponse.json({ error: "Mangler obligatoriske felt" }, { status: 400 });
    }

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Fil for stor (maks 10 MB)" }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Kun PDF-filer er tillatt" }, { status: 400 });
    }

    // Generate storage path
    const timestamp = Date.now();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storagePath = `users/${userId}/documents/${timestamp}_${safeFilename}`;

    // Upload to storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("candidates-private")
      .upload(storagePath, buffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      logger.error("Storage upload failed:", uploadError);
      return NextResponse.json({ error: "Kunne ikke laste opp fil" }, { status: 500 });
    }

    // Insert into database
    const { error: dbError } = await supabase
      .from("user_documents")
      .insert({
        clerk_user_id: userId,
        type,
        name,
        filename: file.name,
        storage_path: storagePath,
        expires_at: expiresAt || null,
      });

    if (dbError) {
      // Clean up uploaded file if DB insert fails
      await supabase.storage.from("candidates-private").remove([storagePath]);

      if (dbError.code === "42P01") {
        return NextResponse.json({ error: "Database ikke konfigurert ennå" }, { status: 500 });
      }
      throw dbError;
    }

    logger.info("Document uploaded", { userId, type, name });

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("Failed to upload document:", err);
    return NextResponse.json({ error: "Kunne ikke laste opp dokument" }, { status: 500 });
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
      return NextResponse.json({ error: "Mangler dokument-ID" }, { status: 400 });
    }

    // First verify ownership and get storage path
    const { data: docs, error: fetchError } = await supabase
      .from("user_documents")
      .select("id, storage_path")
      .eq("id", docId)
      .eq("clerk_user_id", userId);

    if (fetchError && fetchError.code !== "42P01") {
      throw fetchError;
    }

    if (!docs || docs.length === 0) {
      return NextResponse.json({ error: "Dokument ikke funnet" }, { status: 404 });
    }

    const doc = docs[0];

    // Delete from storage
    if (doc.storage_path) {
      await supabase.storage
        .from("candidates-private")
        .remove([doc.storage_path]);
    }

    // Delete from DB
    const { error: deleteError } = await supabase
      .from("user_documents")
      .delete()
      .eq("id", docId)
      .eq("clerk_user_id", userId);

    if (deleteError) {
      throw deleteError;
    }

    logger.info("Document deleted", { userId, docId });

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("Failed to delete document:", err);
    return NextResponse.json({ error: "Kunne ikke slette dokument" }, { status: 500 });
  }
}
