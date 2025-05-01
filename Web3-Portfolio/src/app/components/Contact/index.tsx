"use client"
import React, { useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion'
import { EnvelopeIcon,ChatBubbleLeftIcon, PaperAirplaneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


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


const Contact = () => {


  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<formData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange' 
  });

  // Load reCAPTCHA script when modal opens
  useEffect(() => {

    console.log('AWW')
    if ( !window.grecaptcha) {
      console.log('OUTER')
     if(!document.querySelector('script[src*="recaptcha/api.js"]')){
      console.log('INNER')
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;

      script.onload = () =>{
        window.grecaptcha?.ready(()=>{
          console.log('reCAPTCHA is ready');
        });
      };

      script.onerror = () => {
        console.error('Failed to load reCAPTCHA script');
      };

      document.body.appendChild(script);

      return ()=>{
        document.body.removeChild(script)
       }
    }
     }
  }, []);

  
  const handleFormSubmitAttempt = (data: formData) => {
    if (!isValid) return;
    setShowCaptchaModal(true); 
  };

  const executeCaptcha = async () => {
    if (!window.grecaptcha) {
      alert('CAPTCHA not loaded. Please try again.');
      return;
    }

    try {

      window.grecaptcha.ready(async()=>{
        const token = await window.grecaptcha!.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          {action: 'submit'}
        );

        setCaptchaToken(token);
        submitFormWithToken(token);
      })

    } catch (error) {
      alert('CAPTCHA verification failed');
    } finally {
      setShowCaptchaModal(false);
    }
  };

  const submitFormWithToken = async (token: string) => {
    const formData = formRef.current 
      ? new FormData(formRef.current) 
      : new FormData();

      console.log({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        captcha: token
      })

    try {
      const result = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          captcha: token
        })
      });

      const res = await result.json();
      console.log("RES: ", res)

      if (result.ok) {
        const submitBtn = formRef.current?.querySelector('#submit');
        if (submitBtn) submitBtn.textContent = 'Message Sent!';
        reset();
      } else {
        console.error("ERROR: ", res.error)
        console.log("RESS: ", res)
        alert("Failed to send message!");
        console.error("ERROR: ", res.error)
      }
    } catch (error) {
      alert("Network error");
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
        <h1 className='text-5xl text-amber-400 font-semibold mb-2'>Let's Connect</h1>
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
        <form onSubmit={handleSubmit(handleFormSubmitAttempt)}
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
            className='w-full py-3 bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-[#4b4949] font-bold hover:opacity-90 rounded-lg shadow-md hover:shadow-lg transition-all'
          >
            Send A Message
          </button>
        </form>

          {/* CAPTCHA Modal  */}
        {showCaptchaModal && (
          <div className="fixed inset-0 bg-black/50 text-gray-600 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4">Verify You're Human</h3>
              <p className="mb-4">Please complete the CAPTCHA to send your message</p>
              
              <div 
                className="g-recaptcha" 
                data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                data-size="normal"
              />
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={executeCaptcha}
                  className="px-4 py-2 bg-amber-500 text-white rounded"
                >
                  Verify
                </button>
                <button
                  onClick={() => setShowCaptchaModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default Contact;