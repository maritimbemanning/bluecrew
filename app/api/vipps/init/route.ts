/**
 * Vipps OAuth Init Endpoint
 * 
 * Starts the Vipps Login OAuth flow
 * POST /api/vipps/init
 */

import { NextRequest, NextResponse } from 'next/server';
import { getVippsApiBase } from '@/app/lib/vipps';

export async function POST(req: NextRequest) {
  try {
    const { redirectUrl } = await req.json();

    // Validate environment variables
    const clientId = process.env.VIPPS_CLIENT_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    if (!clientId) {
      return NextResponse.json(
        { error: 'Vipps ikke konfigurert. Kontakt support.' },
        { status: 500 }
      );
    }

    // Generate CSRF token (state)
    const state = crypto.randomUUID();

    // Build Vipps OAuth URL
  const vippsAuthUrl = new URL(`${getVippsApiBase()}/access-management-1.0/access/oauth2/auth`);
    
    vippsAuthUrl.searchParams.set('client_id', clientId);
    vippsAuthUrl.searchParams.set('response_type', 'code');
    vippsAuthUrl.searchParams.set('scope', 'openid name phoneNumber birthDate');
    vippsAuthUrl.searchParams.set('redirect_uri', `${baseUrl}/api/vipps/callback`);
    vippsAuthUrl.searchParams.set('state', state);

    // Store state in cookie for CSRF validation (expires in 10 minutes)
    const response = NextResponse.json({ 
      authUrl: vippsAuthUrl.toString() 
    });

    response.cookies.set('vipps_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Vipps init error:', error);
    return NextResponse.json(
      { error: 'Kunne ikke starte Vipps-pålogging' },
      { status: 500 }
    );
  }
}
