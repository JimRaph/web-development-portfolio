"use client"
import React, { useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion'
import { EnvelopeIcon,ChatBubbleLeftIcon, PaperAirplaneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';


const Contacts = [
    { 
      label: "Email", 
      value: "Jimmyesang@gmail.com",
      icon: <EnvelopeIcon className="w-6 h-6 text-[#FFA500]"/>,
      bgColor: "bg-[#FFD700]/10",
      borderColor: "border-[#FFD700]/30"
    },
    { 
      label: "Telegram", 
      value: "@JimRaph",
      icon: <PaperAirplaneIcon className="w-6 h-6 text-[#007F5C]"/>,
      bgColor: "bg-[#007F5C]/10",
      borderColor: "border-[#007F5C]/30"
    },
    { 
      label: "Twitter", 
      value: "@I_M_EJ",
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#0033A0]"/>,
      bgColor: "bg-[#0033A0]/10",
      borderColor: "border-[#0033A0]/30"
    },
    { 
      label: "Discord", 
      value: "jime6090",
      icon: <ChatBubbleLeftIcon className="w-6 h-6 text-[#C21807]"/>,
      bgColor: "bg-[#C21807]/10",
      borderColor: "border-[#C21807]/30"
    }
  ]

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Message is too short")
  })

  type formData = z.infer<typeof formSchema>;

declare global{
  interface Window{
    grecaptcha?:{
      ready: (callback: ()=>void) => void;
      execute:(siteKey: string, options: {action: string}) => Promise<string>;
    };
  }
}

type ApiResponse = {
  success?: boolean;
  error?: string;
};




const Contact = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isValid } 
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  // Load reCAPTCHA script once
  useEffect(() => {
    if (window.grecaptcha || document.querySelector('script[src*="recaptcha/api.js"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onSubmit = async (data: formData) => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (!window.grecaptcha) {
        throw new Error('CAPTCHA service not available');
      }

      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: 'submit' }
      );

      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          captcha: token
        })
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      toast.success('Message sent successfully!');
      reset();
    } catch (error: unknown) {
      console.error('Submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className='flex flex-col lg:flex-row bg-[#F5F5DC]' id='contacts'>
      {/* Left Side - Contact Info */}
      <div 
      className='md:w-2/2 p-15 pt-20 bg-white w-full'>
        <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          delay:  0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        className='w-5/6 m-auto'>
        <h1 className='text-5xl text-amber-400 font-semibold mb-2'>Let&apos;s Connect</h1>
        <h2 className='text-xl text-[#2E2E2E] mb-10 opacity-90'>
          Open to Web3 projects, collaboration, and creative roles
        </h2>
        
        <div className='mt-10 space-y-6'>
          {Contacts.map((item, index) => (
            <div 
              key={index} 
              className={`p-5 rounded-xl border ${item.borderColor} ${item.bgColor} hover:shadow-md transition-all hover:translate-y-[-4px]`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${item.bgColor} border ${item.borderColor}`}>
                  {item.icon}
                </div>
                <div>
                  <p className='text-[#FFA500] font-bold'>{item.label}</p>
                  <p className='text-gray-600 font-semibold text-sm hover:text-[#C21807] transition-colors'>
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className='md:w-2/2 bg-[#F5F5DC] p-10 mt-20 flex justify-center items-center'>
        <form onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className='w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-[#F5F5DC]'>
          <div className='mb-6'>
            <label className='block text-amber-400  font-semibold mb-2'>Name</label>
            <input 
            required
            {...register("name")}
              type='text' 
              placeholder="Your name or organization"
              className='w-full px-4 py-3 border-2 border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFA500] bg-white text-[#2E2E2E] rounded-lg'
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
          </div>
          
          <div className='mb-6'>
            <label className='block text-amber-400  font-semibold mb-2'>Email</label>
            <input 
            required
            {...register("email")}
              type='email' 
              placeholder="Your email address"
              className='w-full px-4 py-3 border-2 border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFA500] bg-white text-[#2E2E2E] rounded-lg'
            />
             {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
          </div>
          
          <div className='mb-8'>
            <label className='block text-amber-400  font-semibold   mb-2'>Message</label>
            <textarea 
            required
            {...register("message")}
              placeholder="Your message or inquiries"
              rows={4}
              className='w-full px-4 py-3 border-2 border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFA500] bg-white text-[#2E2E2E] rounded-lg'
            />
             {errors.message && <p className='text-red-500 text-sm'>{errors.message.message}</p>}
          </div>
          
          <button
            id='submit'
            type='submit'
            disabled={isSubmitting || !isValid}
            className={`w-full py-3 bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-[#4b4949] font-bold rounded-lg shadow-md transition-all ${
              isSubmitting || !isValid ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send A Message'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;