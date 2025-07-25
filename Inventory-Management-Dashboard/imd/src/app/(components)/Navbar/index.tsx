'use client'

import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { Bell, Menu, MoonIcon, Settings, Sun } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {

    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state)=>state.global.isSidebarCollapsed)

    const toggleSidebar = () =>{
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
    }


  return (
    <div className='flex justify-between items-center w-full mb-7'>
        
        <div className='flex justify-between items-center gap-5'>
            <button className='px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100'
            onClick={toggleSidebar}>
                <Menu className='w-4 h-4'/>
            </button>
        
            <div className='relative'>
                <input type="search"
                placeholder='Start type to search groups & products'
                className='pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300'/>

                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer'>
                    <Bell className='text-gray-500' size={20} />
                </div>
            </div>
        </div>

        <div className='flex justify-between items-center gap-5'>
            <div className="hidden md:flex justify-between items-center gap-5">
                <div className="relative">
                    <Bell className='cursor-pointer text-gray-500' size={24} />
                    <span className='absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red bg-red-400 rounded-full'>
                        3
                    </span>
                </div>
                <hr className='w-0 h-7 border border-solid border-l border-gray-300 mx-3' />
                <div className="flex items-center gap-1 cursor-pointer">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-around">
                        <span className='w-4 h-4 rounded-full bg-amber-50'></span>
                    </div>
                    <span className="font-semibold">User</span>
                </div>
            </div>
            <Link href="/settings">
                <Settings className='cursor-pointer text-gray-500' size={24} />
            </Link>

        </div>
    </div>
  )
}

export default Navbar