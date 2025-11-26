import { NextRequest, NextResponse } from 'next/server';
import { sendApplicationStatusUpdate } from '@/app/lib/server/email';

export async function POST(request: NextRequest) {
  try {
    // Verify internal API key
    const authHeader = request.headers.get('authorization');
    const internalKey = process.env.INTERNAL_API_KEY || process.env.CRON_SECRET;

    if (internalKey && authHeader !== `Bearer ${internalKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, status, jobTitle, message } = body;

    // Validate required fields
    if (!name || !email || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and status' },
        { status: 400 }
      );
    }

    // Validate status value
    const validStatuses = ['reviewed', 'contacted', 'interview', 'rejected', 'hired', 'pending'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Send email using the template
    const result = await sendApplicationStatusUpdate({
      name,
      email,
      status: status as any,
      jobTitle,
      message
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Application status email sent to ${email}`,
      emailId: result.data?.id || 'sent'
    });

  } catch (error) {
    console.error('Error sending application status email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for documentation
export async function GET() {
  return NextResponse.json({
    endpoint: '/api/send-application-status-email',
    method: 'POST',
    authentication: 'Bearer token required (INTERNAL_API_KEY)',
    body: {
      name: 'Applicant name (required)',
      email: 'Applicant email (required)',
      status: 'Status value: reviewed | contacted | interview | rejected | hired | pending (required)',
      jobTitle: 'Job title applied for (optional)',
      message: 'Custom message from recruiter (optional)'
    },
    response: {
      success: true,
      message: 'Application status email sent to {email}',
      emailId: 'Resend email ID'
    }
  });
}