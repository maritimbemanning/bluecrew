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

    // Get user's notification preferences
    const { data, error } = await supabase
      .from("notification_preferences")
      .select("*")
      .eq("clerk_user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found, which is OK
      console.error("Error fetching preferences:", error);
      return NextResponse.json({ error: "Kunne ikke hente innstillinger" }, { status: 500 });
    }

    return NextResponse.json({ preferences: data || null });
  } catch (error) {
    console.error("Notification preferences GET error:", error);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
    }

    const body = await req.json();
    const { preferences } = body;

    if (!preferences) {
      return NextResponse.json({ error: "Mangler preferanser" }, { status: 400 });
    }

    // Upsert preferences
    const { error } = await supabase
      .from("notification_preferences")
      .upsert({
        clerk_user_id: userId,
        push_enabled: preferences.push_enabled ?? false,
        email_enabled: preferences.email_enabled ?? true,
        new_jobs: preferences.new_jobs ?? true,
        application_updates: preferences.application_updates ?? true,
        messages: preferences.messages ?? true,
        document_expiry: preferences.document_expiry ?? true,
        assignment_reminders: preferences.assignment_reminders ?? true,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "clerk_user_id",
      });

    if (error) {
      // If table doesn't exist, just return success (preferences saved client-side)
      if (error.code === "42P01") {
        return NextResponse.json({ success: true, note: "Table not yet created" });
      }
      console.error("Error saving preferences:", error);
      return NextResponse.json({ error: "Kunne ikke lagre innstillinger" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification preferences POST error:", error);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
