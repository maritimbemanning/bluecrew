import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

type NotificationPreferences = {
  push_enabled: boolean;
  email_enabled: boolean;
  new_jobs: boolean;
  application_updates: boolean;
  messages: boolean;
  document_expiry: boolean;
  assignment_reminders: boolean;
};

const DEFAULT_PREFS: NotificationPreferences = {
  push_enabled: false,
  email_enabled: true,
  new_jobs: true,
  application_updates: true,
  messages: true,
  document_expiry: true,
  assignment_reminders: true,
};

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Ikke autorisert" }, { status: 401 });
    }

    // Get from Clerk publicMetadata
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const metadata = user.publicMetadata as { notifications?: NotificationPreferences } | undefined;

    return NextResponse.json({
      preferences: metadata?.notifications || DEFAULT_PREFS
    });
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

    // Get current metadata
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const currentMetadata = user.publicMetadata || {};

    // Update Clerk publicMetadata with notifications
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...currentMetadata,
        notifications: {
          push_enabled: preferences.push_enabled ?? false,
          email_enabled: preferences.email_enabled ?? true,
          new_jobs: preferences.new_jobs ?? true,
          application_updates: preferences.application_updates ?? true,
          messages: preferences.messages ?? true,
          document_expiry: preferences.document_expiry ?? true,
          assignment_reminders: preferences.assignment_reminders ?? true,
          updated_at: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notification preferences POST error:", error);
    return NextResponse.json({ error: "Serverfeil" }, { status: 500 });
  }
}
