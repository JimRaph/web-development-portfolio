import { AlignRightIcon, LogIn, X } from 'lucide-react'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"


const Header = () => {

  const nav_links = ["About", "Benefits", "Integrations", "Pricing", "Testimonials"]


  return (
    <div>
      
      <header className='text-[#07090F] font-medium flex items-center justify-between
      2xl:px-[10rem] lg:px-[4rem] px-[1rem] 2xl:h-[6rem] lg:h-[5rem] h-[4rem]
      '>
        <h1 className="text-white font-semibold 2xl:text-4xl lg:text-3xl text-3xl">WePay</h1>

        <ul className=' text-gray-300  items-center gap-[2rem] px-[3rem] py-3
        bg-[#14161B] rounded-full border border-gray-700 z-1 hidden md:flex'>
         { nav_links?.map((link, idx) => (
            <li key={idx}>
              <a href="#" className='font-medium text-lg hover:text-[#4e798d] transition duration-200'>{link}</a>
            </li>
          ))}
        </ul>

        <div className='hidden lg:flex items-center 2xl:gap-6 gap-4'>
          <button className='flex items-center bg-[#0BA5EC] text-white 2xl:text-[17px] lg:text-sm
          2xl:px-5 lg:px-6 px-4 2xl:py-3 lg:py-[0.7rem] py-[0.5rem] rounded-full cursor-pointer
           hover:bg-red-400 transition duration-300'>
            Sign In <LogIn />
          </button>
        </div>

        <Sheet className="  lg:hidden">

          <SheetTrigger asChild className="text-gray-300 lg:hidden">
            <AlignRightIcon />
          </SheetTrigger>

          <SheetContent className="bg-[#14161B]">

            <SheetClose asChild>
              <button className='absolute right-4 top-4 text-gray-300 hover:text-white'>
                <X />
              </button>
            </SheetClose>

            <ul className="flex flex-col gap-2 mt-[3rem] mx-3">
              { nav_links?.map((link, idx) => (
                  <li key={idx} className='hover:bg-[#343d55] p-2 rounded-full mx-1 transition duration-300'>
                    <a href="#" className='px-2 font-medium text-lg hover:text-[#4e798d] transition duration-200 text-gray-300'>{link}</a>
                  </li>
                ))}

            </ul>

            <button className='flex items-center bg-[#0BA5EC] text-white 2xl:text-[17px] lg:text-sm
          2xl:px-5 lg:px-6 px-4 2xl:py-3 lg:py-[0.7rem] py-[0.5rem] rounded-full cursor-pointer
           hover:bg-red-400 transition duration-300 mx-5 justify-center my-15 gap-2'>
            Sign In <LogIn />
          </button>

          </SheetContent>
        </Sheet>


      </header>

    </div>
  )
}

export default Header
