"use client"

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import scrollToSection from '@/app/components/Scroller'

type navbarProp = {
  topScrolled: boolean
}
const Navbar = ({topScrolled}: navbarProp) => {

  const [modalOpen, setModalOpen] = useState(false)


  const navItems = [
    { name: 'Home', href: 'landing' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' }
  ];

  return (
<nav className={`fixed w-full bg-[#1A1A1A]  z-50 shadow-lg border-b border-[#FFD700]/20
  ${topScrolled ? "bg-[#FFA500]/80" : "bg-[#FFA500]"}`}>
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex justify-between items-center">

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold tracking-tight relative"
      >
        {topScrolled ? (
          <span className="text-2xl font-extrabold bg-clip-text text-transparent 
          bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 relative">
          EJ

          <span className="absolute inset-0 bg-clip-text text-transparent 
          bg-gradient-to-r from-[#FFD700]/30 via-[#FFA500]/20 to-[#FF4500]/10 
          mix-blend-overlay"></span>
        </span> ) :(
          
            <div className="bg-gray-800 rounded-full p-2 cursor-default">
              <span className="text-2xl font-extrabold bg-clip-text text-transparent 
          bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF4500] m-1">
              EJ
            </span>
            </div>
        )}
      </motion.div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-10">
        {navItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={()=>scrollToSection(item.href)}
            className={`relative text-lg font-medium ${topScrolled ? "text-gray-50" :"text-gray-800"}  hover:text-[#FFD700] transition-colors`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.5 }}
          >
            {item.name}
          </motion.button>
        ))}
      </div>


          {/* Mobile Menu Button  */}
          <button className="md:hidden text-[#F5F5DC]"
          onClick={() =>setModalOpen((prev) => !prev)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

        </div>

            {/* Sidebar Menu  */}
        <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
          >
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-md"
              onClick={() => setModalOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full max-w-[320px] bg-[#FFA500] shadow-xl"
            >
              <div className="flex flex-col h-full p-6">
                
                {/* Close Button */}
                <button
                  onClick={() => setModalOpen(false)}
                  className="self-end hover:text-[#1A1A1A] text-[#F5F5DC] transition-colors bg-[#1A1A1A]/80 hover:bg-[#F5F5DC] rounded-full"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="w-8 h-8" />
                </button>

                {/* Navigation Links */}
                <div className="flex flex-col items-center justify-center flex-1 gap-8">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      onClick={() => setModalOpen(false)}
                      className="text-2xl font-medium text-[#1A1A1A] hover:text-[#F5F5DC] transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>

                {/* Optional Footer */}
                <div className="text-center text-[#1A1A1A] text-sm mt-auto border-t-1 border-t-amber-50 pt-3">
                  © {new Date().getFullYear()} EJ
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;