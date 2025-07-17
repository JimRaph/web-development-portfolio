'use client'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

interface SidebarLinksProps {
  href: string,
  icon: LucideIcon,
  label: string,
  isCollapsed: boolean
}

const SidebarLinks = ({ href, icon: Icon, label, isCollapsed }: SidebarLinksProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard")
  const [showTooltip, setShowTooltip] = useState(false)
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Link href={href} className="block">
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
          } gap-3 transition-colors hover:text-blue-500 hover:bg-blue-100 ${
            isActive ? 'bg-blue-200' : ''
          }`}
        >
          <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-700'}`} />
          {!isCollapsed && (
            <span className={`font-medium ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>{label}</span>
          )}
        </div>
      </Link>
      
      {/* tooltip */}
      {isCollapsed && showTooltip && (
        <div 
          className="fixed ml-16 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap z-50"
          style={{
            top: 'calc(var(--mouse-y, 0) - 10px)',
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)

  // Track mouse position for tooltips
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const classname = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} z-40 bg-white
    transition-all duration-300 min-h-full overflow-hidden shadow-md`

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
  }

  return (
    <div className={classname}>
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8
          ${isSidebarCollapsed ? "" : "px-8"}`}>
        <div className={`w-[20px] bg-blue-800 p-2 ${isSidebarCollapsed ? "m-auto" : ""}`}>
          <span className='bg-black'>o</span>
        </div>
        <h1 className={`font-extrabold text-2xl ${isSidebarCollapsed ? "hidden" : "block"}`}>IMD</h1>
        <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}>
          <Menu className='w-4 h-4' />
        </button>
      </div>

      <div className="flex-grow mt-8">
        <SidebarLinks 
          href='/dashboard' 
          icon={Layout} 
          label='Dashboard' 
          isCollapsed={isSidebarCollapsed} />
        <SidebarLinks 
          href='/inventory' 
          icon={Archive} 
          label='Inventory' 
          isCollapsed={isSidebarCollapsed} />
        <SidebarLinks 
          href='/products' 
          icon={Clipboard} 
          label='Products' 
          isCollapsed={isSidebarCollapsed} />
        <SidebarLinks 
          href='/users' 
          icon={User} 
          label='Users' 
          isCollapsed={isSidebarCollapsed} />
        <SidebarLinks 
          href='/settings' 
          icon={Settings} 
          label='Settings' 
          isCollapsed={isSidebarCollapsed} />
        <SidebarLinks 
          href='/expenses' 
          icon={CircleDollarSign} 
          label='Expenses' 
          isCollapsed={isSidebarCollapsed} />
      </div>

      <div className={`mb-10 ${isSidebarCollapsed ? "hidden" : "block"}`}>
        <p className='text-center text-xs text-gray-500'>&copy; 2025 IMD</p>
      </div>
    </div>
  )
}

export default Sidebar