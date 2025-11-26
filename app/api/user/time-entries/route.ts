import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch time entries for a date range
export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("start");
    const endDate = searchParams.get("end");

    let query = supabase
      .from("time_entries")
      .select("*")
      .eq("clerk_user_id", userId)
      .order("date", { ascending: true });

    if (startDate) {
      query = query.gte("date", startDate);
    }
    if (endDate) {
      query = query.lte("date", endDate);
    }

    const { data: entries, error } = await query;

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json({ entries: [] });
      }
      throw error;
    }

    return NextResponse.json({ entries: entries || [] });
  } catch (error) {
    console.error("Time entries GET error:", error);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}

// POST - Create new time entry
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
    }

    const body = await req.json();
    const { date, hours, description, assignment_id } = body;

    if (!date || hours === undefined) {
      return NextResponse.json({ error: "Mangler dato eller timer" }, { status: 400 });
    }

    // Check if entry already exists for this date
    const { data: existing } = await supabase
      .from("time_entries")
      .select("id")
      .eq("clerk_user_id", userId)
      .eq("date", date)
      .single();

    if (existing) {
      // Update existing entry
      const { data: entry, error } = await supabase
        .from("time_entries")
        .update({
          hours,
          description: description || null,
          assignment_id: assignment_id || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ entry });
    }

    // Create new entry
    const { data: entry, error } = await supabase
      .from("time_entries")
      .insert({
        clerk_user_id: userId,
        date,
        hours,
        description: description || null,
        assignment_id: assignment_id || null,
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      if (error.code === "42P01") {
        return NextResponse.json({ error: "Timeregistrering ikke konfigurert" }, { status: 500 });
      }
      throw error;
    }

    return NextResponse.json({ entry });
  } catch (error) {
    console.error("Time entries POST error:", error);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}

// DELETE - Delete a time entry
export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const entryId = searchParams.get("id");

    if (!entryId) {
      return NextResponse.json({ error: "Mangler ID" }, { status: 400 });
    }

    // Only allow deleting draft entries
    const { error } = await supabase
      .from("time_entries")
      .delete()
      .eq("id", entryId)
      .eq("clerk_user_id", userId)
      .eq("status", "draft");

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Time entries DELETE error:", error);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
