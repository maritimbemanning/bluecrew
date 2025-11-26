import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
    }

    // Get user's assignments from database
    const { data: assignments, error } = await supabase
      .from("assignments")
      .select("*")
      .eq("clerk_user_id", userId)
      .order("start_date", { ascending: true });

    if (error) {
      // If table doesn't exist yet, return empty array
      if (error.code === "42P01") {
        return NextResponse.json({ assignments: [] });
      }
      console.error("Error fetching assignments:", error);
      return NextResponse.json({ error: "Kunne ikke hente oppdrag" }, { status: 500 });
    }

    return NextResponse.json({ assignments: assignments || [] });
  } catch (error) {
    console.error("Assignments API error:", error);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
