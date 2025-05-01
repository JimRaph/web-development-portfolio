import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import axios from 'axios';
import Email from '../components/EmailTemp';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiter handler
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '10 m')
});

// CAPTCHA verification handler
const verifyCaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );
    return response.data.success;
  } catch (error) {
    return error ? false : true
  }
};


export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Try again in 10 minutes.' },
        { status: 429 }
      );
    }

    // Validate request
    const { name, email, message, captcha } = await request.json();
    
    if (!name || !email || !message || !captcha) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // CAPTCHA verification
    const isHuman = await verifyCaptcha(captcha);
    if (!isHuman) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 400 }
      );
    }
 
    // Send email
    const { data, error } = await resend.emails.send({
      from: 'po<onboarding@resend.dev>',
      to: [process.env.MY_EMAIL!], 
      subject: `New message from ${name}`,
      react: Email({ name, email, message }) as React.ReactElement,
    });

    if (error) {
      console.log(data)
      console.log("Failed to send email")
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

