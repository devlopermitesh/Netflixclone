"use client"
import useSoundPlayer from '@/hook/useSoundplay';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
const Page = () => {
  const { play, pause } = useSoundPlayer("/Netflix.mp3", 1); // Ensure this hook is implemented correctly
  const router = useRouter()
  useEffect(() => {
    play();
    const timeout = setTimeout(() => {
      router.push('/sign-in');
      pause();
    }, 4000);

    return () => clearTimeout(timeout); 
  }, [play,pause]);

  return (
    <div className="w-screen h-screen bg-[url('/Netflixstaring.gif')] bg-cover bg-center bg-fixed flex items-center justify-center">
    </div>
  )
}

export default Page