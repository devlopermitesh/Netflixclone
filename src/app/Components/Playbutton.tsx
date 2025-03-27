"use client"
import React from "react"
import { FaPlay } from "react-icons/fa";
import Button from "./Button";
import { useRouter } from "next/navigation";
const PlayButton:React.FC<{movieId:string}>=({movieId})=>{
    const router=useRouter();
return(
<Button onClick={()=>router.push(`/watch/${movieId}`)} className="bg-white hover:bg-white/70 text-black hover:text-white  w-20 md:w-30 lg:w-40 text-sm md:text-md lg:text-lg rounded-md md py-1 md:py-2 px-2 md:px-4 transition cursor-pointer flex flex-row items-center justify-center gap-2 font-semibold font-serif">
<FaPlay size={28} className="text-black"/>
Play
</Button>)
}
export default PlayButton;