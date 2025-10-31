/**
 * Vipps OAuth Callback Endpoint
 * 
 * Handles the OAuth callback from Vipps after user authentication
 * GET /api/vipps/callback?code=xxx&state=xxx
 */

import { NextRequest, NextResponse } from 'next/server';
import { getVippsUserInfo, createSession, encryptSession, getVippsApiBase } from '@/app/lib/vipps';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for Vipps errors
    if (error) {
      console.error('Vipps OAuth error:', error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobbsoker/registrer?error=vipps_auth_failed`
      );
    }

    // Validate required parameters
    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobbsoker/registrer?error=invalid_callback`
      );
    }

    // Validate CSRF state token
    const storedState = req.cookies.get('vipps_state')?.value;
    if (!storedState || storedState !== state) {
      console.error('CSRF state mismatch');
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobbsoker/registrer?error=csrf_failed`
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      `${getVippsApiBase()}/access-management-1.0/access/oauth2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY!,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/vipps/callback`,
          client_id: process.env.VIPPS_CLIENT_ID!,
          client_secret: process.env.VIPPS_CLIENT_SECRET!,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Vipps token exchange failed:', errorText);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobbsoker/registrer?error=token_failed`
      );
    }

    const { access_token } = await tokenResponse.json();

    // Fetch user info from Vipps
    const userInfo = await getVippsUserInfo(access_token);

    if (!userInfo) {
      console.error('Failed to get Vipps user info');
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobbsoker/registrer?error=userinfo_failed`
      );
    }

    // Validate phone number is verified
    if (!userInfo.phone_number_verified) {
      console.error('Vipps phone number not verified');
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/jobbsoker/registrer?error=phone_not_verified`
      );
    }

    // Create and encrypt session
    const session = createSession(userInfo);
    const encryptedSession = encryptSession(session);

    // Redirect back to registration form with session cookie
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/jobbsoker/registrer?verified=true`
    );

    // Set secure session cookie (expires in 24 hours)
    response.cookies.set('vipps_session', encryptedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    // Clear CSRF state cookie
    response.cookies.delete('vipps_state');

    return response;

  } catch (error) {
    console.error('Vipps callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/jobbsoker/registrer?error=callback_failed`
    );
  }
}
