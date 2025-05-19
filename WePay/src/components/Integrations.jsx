import { dotIntegrations, integration1, integration2, integration3, integration4, integration5, integration6 } from '@/exports/images'
import React from 'react'

const Integrations = () => {
  return (
    <section className='text-gray-300 2xl:px-[5rem] lg:[px-4rem] px-[1rem] lg:mt-[6rem]'>

      <div className='flex flex-col py-20 gap-3 items-center bg-[#14161B]
      border-2 border-[#1B1C21] rounded-xl relative xl:mx-20  lg:mx-15 md:mx-5'>
        <span className='bg-[#25262B] font-semibold tracking-widest border-red-400 border-1 rounded-full 
        text-red-400 px-4 py-1 capitalize'>integrations</span>
        <h1 className='text-4xl font-semibold capitalize'>connect. sync. grow</h1>
        <p className=" text-lg ">Bring all your favourite tools together - automate tasks, <br /> stay compliant
        and deliver a smoother employee experience
        </p>

        <div className='grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 mt-10 gap-20
        md:gap-x-40 md:gap-y-10 lg:gap-10 xl:gap-20'>

          <div className='bg-[#202227] p-5 rounded-2xl hover:bg-gray-800 z-2'>
            <img src={integration1} alt="" className='h-[4rem] object-contain'/>
          </div>
         <div className='bg-[#202227] p-5 rounded-2xl hover:bg-gray-800 z-2'>
            <img src={integration2} alt="" className='h-[4rem] object-contain'/>
          </div>
         <div className='bg-[#202227] p-5 rounded-2xl hover:bg-gray-800 z-2'>
            <img src={integration3} alt="" className='h-[4rem] object-contain'/>
          </div>
         <div className='bg-[#202227] p-5 rounded-2xl hover:bg-gray-800 z-2'>
            <img src={integration4} alt="" className='h-[4rem] object-contain'/>
          </div>
         <div className='bg-[#202227] p-5 rounded-2xl hover:bg-gray-800 z-2'>
            <img src={integration5} alt="" className='h-[4rem] object-contain'/>
          </div>
         <div className='bg-[#202227] p-5 rounded-2xl hover:bg-gray-800 z-2'>
            <img src={integration6} alt="" className='h-[4rem] object-contain'/>
          </div>

        </div>

        <img src={dotIntegrations} alt="" className='w-full absolute bottom-2 lg:h-[11rem] 
        md:h-[20.2rem] h-[34.5rem] '/>

      </div>

    </section>
  )
}

export default Integrations
