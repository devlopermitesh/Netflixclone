"use client"
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'
interface SidebarIconProps{
    icon:React.ElementType,
    label:string,
    active?:boolean,
    href:string

}
const SideBarItem:React.FC<SidebarIconProps> = ({icon:Icon,label,active=false,href}) => {
  return (
    <Link 
      href={href}
      className={twMerge(`
        flex 
        flex-row h-auto 
        items-center
        w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition
        text-neutral-400 py-1
        z-50
        rounded-md
        hover:bg-neutral-700
      `, active && 'text-white bg-neutral-800')}
    >
      <Icon />
      {label}    
    </Link>
  )
}

export default SideBarItem