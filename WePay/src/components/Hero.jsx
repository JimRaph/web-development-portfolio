import React from 'react'
import { brand1, brand2, brand3, brand4, screenshot1, dotHero, element1 } from "../exports/images";
import { ChevronRight } from 'lucide-react';


const Hero = () => {
  return (
    <div className=''>

                  {/* <span className="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition 
        duration-300 rounded-full"></span> */}

      <section className='relative 2xl:py-[5rem] lg:py-[4rem] md:py-[6rem] py-[4rem]
       2xl:px-[10rem] lg:px-[4rem] px-[1rem] mt-10 flex flex-col justify-center items-center'>

         <img src={element1} className="absolute -top-10 -right-32" alt="" />
         <img src={element1} className="absolute -top-64 -left-32 -scale-x-[1]" alt="" />
      
        <div className="w-full py-2 bg-gray-800/20">
            <span className='pointer-events-none z-[0] text-center mx-auto left-0 right-0 
            py-1 w-45 border border-[#0BA5EC] top-10 font-medium rounded-full px-5
            2xl:text-sm lg:text-sm text-xs text-[#0BA5EC] blur-lg absolute bg-[#181A20] 
            '>Introducing Upshift</span>
            <span className='text-center mx-auto left-0 right-0 absolute  px-5
            py-1 w-45 border border-[#0BA5EC] top-10 font-medium rounded-full
            2xl:text-sm lg:text-sm text-xs text-[#0BA5EC] z-[1] bg-[#181A20]
            '>Introducing Upshift</span>

        </div>

        <h1 className='text-white text-center font-semibold capitalize mt-6
        2xl:text-7xl lg:text-6xl text-6xl'>
          Revolutionize your HR and <br className='2xl:block lg:block md:block hidden' />payroll operations
        </h1>

        <div className='pt-5 pb-6 border-b border-[#1B1C21] z-1'>
          <p className='text-gray-300 text-center text-sm lg:text-lg px-2'>Simplify workforce management, stay compliant, and boost 
             <br className='2xl:block lg:block md:block hidden' />employee engagement with our all-in-one platform.</p>
        </div>

      <button className="relative overflow-hidden group text-gray-300 text-lg font-medium 
      bg-gradient-to-r from-[#0BA5EC] via-blue-500 to-pink-500 flex items-center
      px-6 py-3 mt-8 rounded-full transition duration-300 capitalize cursor-pointer z-[2]">
        <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition 
        duration-300 rounded-full"></span>
        <span className=" z-10 flex items-center">
          Start your journey <ChevronRight />
        </span>
      </button>

      <p className='text-gray-300 mt-6 lg:text-lg text-sm lg:mt-8 z-1'>Trusted by industry-leading organizations worldwide</p>

      <div className='flex flex-col md:flex-row gap-3 md:gap-5 lg:gap-10 mt-5'>
        <img src={brand1} alt="" className='object-contain h-[3rem] 2xl:h-[3.5rem]'/>
        <img src={brand2} alt="" className='object-contain h-[3rem] 2xl:h-[3.5rem]'/>
        <img src={brand3} alt="" className='object-contain h-[3rem] 2xl:h-[3.5rem]'/>
        <img src={brand4} alt="" className='object-contain h-[3rem] 2xl:h-[3.5rem]'/>
      </div>

      <img src={dotHero} alt="" className='absolute object-contain lg:top-[7rem] top-[17rem] w-[80%]'/>   

      <div className='md:block hidden absolute bg-[#0ba5ec6b] h-[10rem] w-[40rem] 
      blur-[5rem] 2xl:top-[45rem] lg:top-[40rem]'></div>

      <img src={screenshot1} alt="" className='object-cover lg:mt-[5rem] mt-[4rem] border
       border-[#1B1C21] rounded-xl z-1' />

      </section>

    </div>
  )
}

export default Hero
