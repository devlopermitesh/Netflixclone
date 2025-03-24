"use client"
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'
import Box from './Box';
import SideBarItem from './SideBarItem';
import { twMerge } from 'tailwind-merge';
import { MdDashboardCustomize, MdFeedback } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { MdApproval } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import Profile from './Profile';
import useSWR from 'swr';
import { useCurrentUser } from '@/hook/useCurrentuser';
import Image from 'next/image';
import Nextflixlogo from "@/assets/images/NetflixLogo.png"
import { useuploadModel } from '@/hook/useUploadModel';
interface SidebarProps{
    children: React.ReactNode,


}
const Sidebar:React.FC<SidebarProps> = ({children}) => {
    const pathname = usePathname();
    const {data,error,isLoading,mutate}=useCurrentUser()
    const Route=useMemo(()=>[
        {   icon:MdDashboardCustomize,
            label:"Dashboard",
            active:pathname==="/",
            href:'/',

        },
  
        {  icon:CiBoxList,
            label:"List All Movies",
            active:pathname==="/listmovie",
            href:'/listmovie',
        },
        {  icon:MdApproval,
            label:"Pending Approval",
            active:pathname==="/pending_approval",
            href:'/pending_approval',
        },
        {  icon:MdFeedback,
            label:"Feedbacks",
            active:pathname==="/feedbacks",
            href:'/feedbacks',
        },
        {  icon:LuLogOut,
            label:"Logout",
            active:pathname==="/logout",
            href:'/',
        },
        
        
    ],[pathname])
  return (
    <div className={twMerge(` flex h-full `)}>
        <div className='hidden md:flex flex-col space-y bg-black w-[300px] h-full p-2  '>
        <Box className=' h-full'>
  <div className='flex flex-col gap-y-6 px-5 py-4'>
    <div className='flex flex-col gap-y-2 px-5 w-full items-center justify-center'>
<Image src={Nextflixlogo} alt='logo' height={100} width={100} className='w-full h-35 object-fill  px-4 '/>
<Profile  imageUrl={data?.image} size={"lg"} shape='Rounded'  className=''/>
<h2 className='text-2xl text-white font-semibold '>{data?.name||"Admin"}</h2>
    </div>
    
{Route.map((route)=>(<SideBarItem key={route.label} {...route}></SideBarItem>))}
  </div>
    </Box>

        </div>
        <main className='h-full flex-1 overflow-y-auto '>
            {children}
        </main>
    </div>
  )
}

export default Sidebar