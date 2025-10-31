import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  if (!code) {
    return NextResponse.redirect(
      new URL('/jobbsoker/registrer?error=no_code', request.url)
    );
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_CRIIPTO_DOMAIN}/oauth2/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: process.env.NEXT_PUBLIC_CRIIPTO_CLIENT_ID!,
          client_secret: process.env.CRIIPTO_CLIENT_SECRET!,
          redirect_uri: `${new URL(request.url).origin}/api/auth/criipto/callback`,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error('Token exchange failed');
    }

    const tokens = await tokenResponse.json();
    
    // Decode ID token to get user info
    const idTokenPayload = JSON.parse(
      Buffer.from(tokens.id_token.split('.')[1], 'base64').toString()
    );

    // Create session JWT
    const session = await new SignJWT({
      sub: idTokenPayload.sub,
      name: idTokenPayload.name,
      ssn: idTokenPayload.ssn || idTokenPayload['https://criipto.io/claims/ssn'],
      phone: idTokenPayload.phone_number,
      identityscheme: idTokenPayload.identityscheme,
      verified_at: new Date().toISOString(),
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    // Redirect back to form with session cookie
    const response = NextResponse.redirect(
      new URL('/jobbsoker/registrer?verified=true', request.url)
    );
    
    response.cookies.set('criipto_session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Criipto callback error:', error);
    return NextResponse.redirect(
      new URL('/jobbsoker/registrer?error=auth_failed', request.url)
    );
  }
}
