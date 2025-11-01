import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/jobbsoker/registrer?vipps_error=${error}`, request.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/jobbsoker/registrer?vipps_error=missing_params", request.url)
    );
  }

  // Verify state matches
  const cookieStore = await cookies();
  const storedState = cookieStore.get("vipps_state")?.value;
  const storedNonce = cookieStore.get("vipps_nonce")?.value;

  if (state !== storedState) {
    return NextResponse.redirect(
      new URL("/jobbsoker/registrer?vipps_error=invalid_state", request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch(
      `${process.env.VIPPS_API_BASE_URL}/access-management-1.0/access/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.VIPPS_CLIENT_ID}:${process.env.VIPPS_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Ocp-Apim-Subscription-Key": process.env.VIPPS_SUBSCRIPTION_KEY!,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.VIPPS_REDIRECT_URI!,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Vipps token error:", errorText);
      return NextResponse.redirect(
        new URL("/jobbsoker/registrer?vipps_error=token_failed", request.url)
      );
    }

    const tokens = await tokenResponse.json();

    // Decode ID token to get user info (basic JWT decode - in production use a library)
    const idTokenParts = tokens.id_token.split(".");
    const payload = JSON.parse(
      Buffer.from(idTokenParts[1], "base64").toString("utf8")
    );

    // Verify nonce
    if (payload.nonce !== storedNonce) {
      return NextResponse.redirect(
        new URL("/jobbsoker/registrer?vipps_error=invalid_nonce", request.url)
      );
    }

    // Store verified session
    const vippsSession = {
      sub: payload.sub,
      name: payload.name,
      phone_number: payload.phone_number,
      birthdate: payload.birthdate,
      verified_at: new Date().toISOString(),
    };

    cookieStore.set("vipps_session", JSON.stringify(vippsSession), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600, // 1 hour
    });

    // Clean up state/nonce cookies
    cookieStore.delete("vipps_state");
    cookieStore.delete("vipps_nonce");

    return NextResponse.redirect(
      new URL("/jobbsoker/registrer/skjema?verified=true", request.url)
    );
  } catch (error) {
    console.error("Vipps callback error:", error);
    return NextResponse.redirect(
      new URL("/jobbsoker/registrer?vipps_error=server_error", request.url)
    );
  }
}
