"use client"
import Modals from '@/app/Components/Modals'
import { useuploadModel } from '@/hook/useUploadModel'
import { useRouter } from 'next/navigation'
import React,{ useState } from 'react'
import { twMerge } from 'tailwind-merge'
import useInfoModal from '@/hook/useInfoModel'
import useWatchMovie from '@/hook/usewatchMovie'


const InfoModelProvider=()=>{

const { isopen, OnOpen, OnClose ,MovieId } = useInfoModal();
const {data}=useWatchMovie(MovieId!)

return (
<div>
    </div>
)
}
export default InfoModelProvider;