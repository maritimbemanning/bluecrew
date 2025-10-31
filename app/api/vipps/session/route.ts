/**
 * Vipps Session Check Endpoint
 * 
 * Checks if user has a valid Vipps session
 * GET /api/vipps/session
 */

import { NextRequest, NextResponse } from 'next/server';
import { decryptSession } from '@/app/lib/vipps';

export async function GET(req: NextRequest) {
  try {
    const encryptedSession = req.cookies.get('vipps_session')?.value;

    if (!encryptedSession) {
      return NextResponse.json({
        verified: false,
        reason: 'no_session',
      });
    }

    // Decrypt and validate session
    const session = decryptSession(encryptedSession);

    if (!session) {
      // Session invalid or expired - clear cookie
      const response = NextResponse.json({
        verified: false,
        reason: 'invalid_or_expired',
      });

      response.cookies.delete('vipps_session');
      return response;
    }

    // Session is valid
    return NextResponse.json({
      verified: true,
      session: {
        name: session.name,
        givenName: session.givenName,
        familyName: session.familyName,
        phone: session.phone,
        birthDate: session.birthDate,
        verifiedAt: session.verifiedAt,
      },
    });

  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      {
        verified: false,
        reason: 'error',
      },
      { status: 500 }
    );
  }
}
