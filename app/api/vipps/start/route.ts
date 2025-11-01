import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const state = crypto.randomBytes(16).toString("hex");
  const nonce = crypto.randomBytes(16).toString("hex");

  // Store state and nonce in httpOnly cookies for security
  const cookieStore = await cookies();
  cookieStore.set("vipps_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600, // 10 minutes
  });
  cookieStore.set("vipps_nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: process.env.VIPPS_CLIENT_ID!,
    response_type: "code",
    scope: "openid name phoneNumber birthDate",
    state,
    nonce,
    redirect_uri: process.env.VIPPS_REDIRECT_URI!,
  });

  const authUrl = `${process.env.VIPPS_API_BASE_URL}/access-management-1.0/access/oauth2/auth?${params}`;

  return NextResponse.redirect(authUrl);
}
