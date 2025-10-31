import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get('criipto_session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ verified: false });
  }

  try {
    const { payload } = await jwtVerify(sessionCookie, JWT_SECRET);
    
    return NextResponse.json({
      verified: true,
      session: {
        name: payload.name,
        ssn: payload.ssn,
        phone: payload.phone,
        identityscheme: payload.identityscheme,
        verifiedAt: payload.verified_at,
      },
    });
  } catch (error) {
    return NextResponse.json({ verified: false });
  }
}
