
import { facebook, github, instagram } from '@/exports/images'
import React from 'react'

const Footer = () => {
  return (
   <section className='text-gray-400 mt-30 border-t border-gray-600'>

    <div className='lg:flex lg:flex-row flex-col gap-15 lg:gap-3 cursor-default
    2xl:px-[10rem] lg:px-[4rem]  px-[10rem] 2xl:mt-[5rem] 2xl:py-[3rem] lg:mt-[4rem]
     lg:py-[3rem] mt-[3rem] py-[2rem] xl:pl-[10rem] lg:pl-[10rem] 2xl:pl-[15rem]
    sm:grid sm:grid-cols-2 '>

      <div className='flex-1/4'>
        <h1 className='font-bold text-3xl mb-2 text-white'>WePay</h1>
        <p className='mb-3'>Payment made easy</p>
        <div className='flex items-center gap-3 mt-5'>
          <div className='bg-gray-300 p-2 rounded-full hover:bg-gray-600'>
            <img src={facebook} alt="" className='w-5 h-5 object-contain'/>
          </div>
          <div className='bg-gray-300 p-2 rounded-full hover:bg-gray-600'>
            <img src={instagram} alt="" className='w-5 h-5 object-contain'/>
          </div>
         <div className='bg-gray-300 p-2 rounded-full hover:bg-gray-600'>
            <img src={github} alt="" className='w-5 h-5 object-contain'/>
          </div>
        </div>
      </div>

      <div className='flex-1/4 capitalize text-left sm:mt-[0rem] mt-[2rem]'>
        <h4 className='text-2xl mb-2 font-semibold'>Company</h4>
        <div>
          <p className='hover:underline'>About Us</p>
          <p className='hover:underline'>Our Team</p>
          <p className='hover:underline'>Careers</p>
          <p className='hover:underline'>Press & Media</p>
          <p className='hover:underline'>Privacy Policy</p>
          <p className='hover:underline'>Media</p>
        </div>
      </div>

      <div className='flex-1/4 capitalize sm:mt-[0rem] mt-[2rem]'>
        <h4 className='text-2xl mb-2 font-semibold'>Solutions</h4>
        <div>
          <p className='hover:underline'>customer web development</p>
          <p className='hover:underline'>e-commerce solutions</p>
          <p className='hover:underline'>enterprise software</p>
          <p className='hover:underline'>brading & identify</p>
          <p className='hover:underline'>social media marketing</p>
          <p className='hover:underline'>Onboarding</p>
        </div>
      </div>

      <div className='flex-1/4 capitalize sm:mt-[0rem] mt-[2rem]'>
        <h4 className='text-2xl mb-2 font-semibold'>resources</h4>
        <div>
          <p className='hover:underline transition duration-500 '>blog & insight</p>
          <p className='hover:underline transition duration-500 '>customer success stories</p>
          <p className='hover:underline transition duration-500 '>help center</p>
          <p className='hover:underline transition duration-500 '>e-books & guides</p>
          <p className='hover:underline transition duration-500 '>developer API</p>
          <p className='hover:underline transition duration-500 '>tutorial doc</p>
        </div>
      </div>

    </div>

    <p className="text-sm text-gray-500 text-center border-t border-gray-800 py-[1rem]">
  &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
</p>


   </section>
  )
}

export default Footer
