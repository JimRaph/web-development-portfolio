"use client"

import Image from 'next/image'
import { motion } from 'framer-motion';
import scrollToSection from '../Scroller';



const Landing = () => {
  return (

    <section id="landing" className="bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF4500]">

  <div className="w-5/6 m-auto flex flex-col md:flex-row 
    items-center justify-center gap-8 md:gap-16 px-6 py-12 md:px-12 md:py-24">

    {/* Text  */}
    <div className="md:w-1/2 space-y-3 md:space-y-4 mt-12 md:mt-32 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2E2E2E]">
        Hi, I'm <span className="text-[#C21807]">Jimmy</span>
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-[#2E2E2E]">
        Web3 Enthusiast
      </h2>
      <p className="text-lg md:text-2sm text-[#3F3F3F]  cursor-pointer">
      Over 4 years of helping projects build and grow their communities, create content to enhance their social presence, and promote products and services
      </p>

      <div className="flex md:flex-col border-[#FFD700] border-2 rounded-xl overflow-hidden">
        <button
        onClick={()=>scrollToSection("contacts")} className="flex-1 bg-[#FFD700] text-[#2E2E2E] 
        font-semibold px-6 py-3 cursor-pointer hover:bg-[#f7cc8d] hover:text-white transition-all duration-500">
          Contact Me
        </button>
        <button 
        onClick={()=>scrollToSection("projects")}
        className="flex-1 text-[#2E2E2E]
        font-semibold px-6 py-3 cursor-pointer hover:bg-[#ffd99377] hover:text-white transition-all duration-500">
          View My Work
        </button>
      </div>
    </div>

    {/* image */}
    <div className="md:w-1/2 flex justify-center mt-16 md:mt-32 bg-white md:order-2">

      <div className="relative z-0 ml-20 before:absolute before:-top-20 before:-left-20 
          before:rounded-t-[400px] before:w-full before:max-w-[400px] 
          md:before:max-w-[600px] before:h-full before:border-5 before:border-[#FFD700] 
          before:z-[-10]"
      >
        <Image
          src="/pfp.jpg"
          alt="Your Name"
          width={400}
          height={400}
          className="rounded-xl shadow-2xl border-4 border-white"
          priority
        />
      </div>
    </div>

  </div>
</section>


  )
}

export default Landing
