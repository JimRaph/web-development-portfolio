import React from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PaperAirplaneIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import scrollToSection from '../Scroller';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  
    const footItems = [
    { name: 'Home', href: 'landing' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contacts' }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1E1E1E] to-[#2E2E2E] pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#FFD700]/20">
          
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4  flex flex-col items-center md:items-start"
          >
            <div className="flex items-center  gap-3 ">
              <div className="text-2xl font-bold text-[#FFD700] font-mono tracking-wider">
                <span className="text-2xl font-extrabold bg-clip-text text-transparent 
                  bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF4500]">
                  EJ
                </span>
              </div>
              <div className="h-0.5 w-8 bg-[#FFA500]"></div>
            </div>
            <p className="text-[#F5F5DC]/80 text-sm max-w-xs ">
              Bridging people and protocols with purpose-driven community building
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center md:items-start text-[#F5F5DC]/80"
          >
            <h3 className="text-[#FFA500] text-sm font-medium mb-4 tracking-wider">EXPLORE</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {footItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={()=>scrollToSection(item.href)}
            className={`relative text-left hover:text-[#FFD700] `}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.5 }}
          >
            {item.name}
          </motion.button>
        ))}
            </div>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-[#FFA500] text-sm font-medium mb-4 tracking-wider">
                CONNECT
            </h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:jimmyesang@gmail.com" className="flex items-center gap-2
               text-[#F5F5DC]/80 hover:text-[#FFD700] transition-colors">
                <EnvelopeIcon className="w-4 h-4" />
                <span className="text-sm">jimmyesang@gmail.com</span>
              </a>
              <a href="https://t.me/JimRaph" className="flex items-center gap-2 
              text-[#F5F5DC]/80 hover:text-[#FFD700] transition-colors">
                <PaperAirplaneIcon className="w-4 h-4" />
                <span className="text-sm">@JimRaph</span>
              </a>
              <a href="https://twitter.com/I_M_EJ" className="flex items-center gap-2
               text-[#F5F5DC]/80 hover:text-[#FFD700] transition-colors">
                <CodeBracketIcon className="w-4 h-4" />
                <span className="text-sm">@I_M_EJ</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6 text-center"
        >
          <p className="text-[#F5F5DC]/50 text-xs">
            &copy; {currentYear} Jimmy. All rights reserved. | Built with Next.js and Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;