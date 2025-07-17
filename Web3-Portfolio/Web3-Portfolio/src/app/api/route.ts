import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import axios from 'axios';
import Email from '../components/EmailTemp';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiter - stricter for production
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '10 m'),
  analytics: true, // Enable analytics
  prefix: 'contact-form:' // Add namespace
});

// Secure CAPTCHA verification
const verifyCaptcha = async (token: string | null): Promise<boolean> => {
  // Validate token first
  if (!token || token.length < 20) return false;

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '',
        response: token,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 3000 // 3s timeout
      }
    );

    return response.data?.success === true && 
           (response.data?.score || 0.5) >= 0.5; // Score check for v3
  } catch (error) {
    console.error('CAPTCHA verification failed:', error);
    return false; // Fail secure
  }
};

export async function POST(request: Request) {
  try {
    // Rate limiting with better IP handling
    const ip = (request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1');
    
    const { success, pending, reset } = await ratelimit.limit(ip);
    await pending; // Wait for Redis operation

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        { error: `Too many requests. Try again in ${retryAfter} seconds.` },
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString()
          }
        }
      );
    }

    // Validate request body
    const { name, email, message, captcha } = await request.json();
    
    // Strict validation
    if (!name?.trim() || !email?.trim() || !message?.trim() || !captcha?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // CAPTCHA verification
    const isHuman = await verifyCaptcha(captcha);
    if (!isHuman) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed. Please try again.' },
        { status: 403 } // 403 is more appropriate for failed verification
      );
    }

    // Sanitize inputs before email
    const sanitizedMessage = message.replace(/<[^>]*>?/gm, ''); // Basic HTML stripping

    // Send email with error handling
    const { error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [process.env.MY_EMAIL!],
      subject: `New message from ${name.trim()}`,
      react: Email({ 
        name: name.trim(), 
        email: email.trim(), 
        message: sanitizedMessage 
      }) as React.ReactElement,
    });

    if (error) {
      console.error('Email failed:', error);

      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' }, // Generic error
        { status: 502 } // Bad Gateway
      );
    }

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}