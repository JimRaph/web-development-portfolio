import React from 'react';

const Hero = () => {
  return (
    <section className="relative">
        <div className='border-3 border-blue-800 mx-[2rem] mt-[3rem] flex flex-col 
        lg:flex-row lg:gap-[4rem] items-center bg-blue-800 md:mx-[8rem] lg:mx-[2rem]
        relative'>

            <div className='text-center lg:text-left flex flex-col gap-5 pb-[2rem]
            flex-1 md:w-full pt-[3rem]'>
                <h1 className='capitalize text-4xl lg:text-5xl 2xl:text-6xl text-gray-100 
                lg:px-[2rem] xl:px-[3rem] 2xl:px-[5rem] relative'>indulge in <span className='bg-gray-100 h-3 w-[11rem] lg:absolute top-[1.5rem] ml-[2rem]
                2xl:top-[1.8rem] rounded-sm'></span>
                <br className='lg:block ' />affordable luxury

                </h1>

                <p className='lg:text-left text-gray-300 lg:px-[2rem] xl:px-[3rem] 
                2xl:px-[5rem] px-[2rem] sm:px-[5rem]'>
                    Welcome to Luxury & Cheap — where elegance meets affordability.
                    <br className='lg:block hidden sm:block md:hidden'/> Shop the finest fashion, accessories, and lifestyle picks
                    <br className='lg:block hidden'/>without breaking the bank.
                </p>

                <div className='flex lg:relative xl:mx-[3.5rem] lg:mx-[2rem]
                 z-10 lg:mt-[1rem] 2xl:mx-[5rem] '>
                    <button className='bg-white px-4 py-3 rounded-full capitalize font-semibold
                    text-blue-800 absolute sm:top-[65%] top-[70%] right-[40%] lg:relative z-2
                    lg:z-0 lg:top-0 lg:right-0 backdrop-blur-2xl shadow-2xl transition-all
                    duration-300 hover:scale-105 hover:bg-gray-100/90 text-xl lg:text-lg'>
                        <a href="#products">shop now</a>
                    </button>
                </div>

            </div>

            
            <div className='flex-1 relative h-[400px] lg:h-[600px] w-full
           '>
            <div className='absolute inset-0 top-0 right-0 text-center bg-yellow-500/20'></div>
                <img 
                    src="src/assets/hero(2).jpg" 
                    alt="" 
                    className='object-cover w-full h-full z-1 ' 
                />
            </div>
        </div>
    </section>
  );
}

export default Hero;
