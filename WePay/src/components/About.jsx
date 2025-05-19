import { dotAbout, screenshot2 } from '@/exports/images'
import { ChartColumnIncreasingIcon, CircleCheck, CircleCheckIcon, DollarSignIcon, Scale, UmbrellaIcon } from 'lucide-react'
import React from 'react'

const About = () => {

  const role = [
    {
      name: "Payroll",
      icon: <DollarSignIcon />,
      class: "ab"
    }
  ]
  return (

    
        <section className="text-gray-300 relative flex flex-col items-center justify-center 2xl:px-[10rem] lg:px-[4rem] px-[1rem] 2xl:py-[5rem] lg:py-[3rem] py-[1rem]">
      
      <span className='bg-[#181A20] px-5 py-1 border border-[#0BA5EC] 
      2xl:text-sm lg:text-sm text-xs text-[#0BA5EC] rounded-full font-semibold 
      tracking-widest'>About WePay</span>

      <h1 className='text-center text-gray-300 font-semibold 2xl:text-5xl lg:text-4xl 
      text-4xl 2xl:leading-[3.5rem] capitalize mt-6'>
        your complete solution for <br />modern HR management</h1>
      <p className="text-gray-300 2xl:text-lg lg:text-sm text-sm text-center 2xl:py-7 
      lg:py-7 py-5">
        Automate payroll, safeguard sensitive data, and gain actionable insights 
         <br className="2xl:block lg:block hidden" />to empower your HR team and workforce.
      </p>

      <div className="relative flex justify-center 2xl:py-[3.4rem] lg:py-[2.5rem] py-[2rem]
       2xl:px-[16rem] lg:px-[12rem] px-[4rem] border border-[#1B1C21] 2xl:rounded-3xl 
       lg:rounded-2xl rounded-xl">

        <img src={dotAbout} alt="" className="absolute top-0"/>
        <img src={screenshot2} alt="" className="object-contain 2xl:h-[22rem] lg:h-[18rem] 
        h-[16rem]"/>

        <span className="absolute 2xl:top-[7rem] lg:top-[6.8rem] top-[5rem] 
        2xl:left-[13rem] lg:left-[9rem] left-[1rem] flex items-center bg-[#14161B] 
        px-3 py-2 border border-[#1F2125] text-white font-medium text-sm rounded-lg">
          <DollarSignIcon className="mr-2 text-[#0BA5EC]" strokeWidth="4" size="15"/> Payroll
        </span>

        <span className="absolute 2xl:top-[19rem] lg:top-[15rem] top-[13rem] 2xl:left-[12rem]
         lg:left-[9rem] left-[1rem] flex items-center bg-[#14161B] px-3 py-2 border
          border-[#1F2125] text-white font-medium text-sm rounded-lg">
          <Scale  className="mr-2 text-red-400" strokeWidth="4" size="15"/> Compliance
        </span>

        <span className="absolute 2xl:top-[7.5rem] lg:top-[6.8rem] top-[5rem]
         2xl:right-[13rem] lg:right-[9rem] right-[1rem] flex items-center bg-[#14161B] 
         px-3 py-2 border border-[#1F2125] text-white font-medium text-sm rounded-lg">
          <UmbrellaIcon className="mr-2 text-[#0BA5EC]" strokeWidth="4" size="15"/> Time-off
        </span>

        <span className="absolute 2xl:top-[19rem] lg:top-[15rem] top-[13rem] 
        2xl:right-[13rem] lg:right-[9rem] right-[1rem] flex items-center bg-[#14161B] 
        px-3 py-2 border border-[#1F2125] text-white font-medium text-sm rounded-lg">
          <ChartColumnIncreasingIcon className="mr-2 text-red-400" strokeWidth="4" size="15" /> Analytics
        </span>

      </div>


      <ul className="flex items-center 2xl:flex-row lg:flex-row flex-col 2xl:gap-8 lg:gap-8
       gap-1 mt-8 2xl:text-[16px] lg:text-sm">

        <li className="flex items-center text-[#36BFFA]">
          <CircleCheck /> Unified employee database
        </li>
        <li className="flex items-center text-[#36BFFA]">
          <CircleCheck /> Instant regulatory compliance alerts
        </li>
        <li className="flex items-center text-[#36BFFA]">
          <CircleCheckIcon /> Tailored analytics and reporting
        </li>

      </ul>

    </section>
  )
}

export default About
