"use client";

import useBillBoard from "@/hook/useBillBoard";
import React from "react";
import Button from "./Button";
import { IoIosInformationCircleOutline } from "react-icons/io";
import PlayButton from "./Playbutton";
import useInfoModal from "@/hook/useInfoModel";
export interface VideoData {
  id: string;
  title: string;
  description: string;
  genre: string;
  duration: string;
  VideoUrl: string;
  trailerUrl: string;
  thumbnailUrl: string;
  likes: number;
  Views: number;
}

const Billboard = () => {
    const { data: { data: [Movie] = [] } = {}, isLoading, error } = useBillBoard() as { data?:{data:VideoData[]} ; isLoading: boolean; error: Error | null } ;
  const {OnOpen}=useInfoModal()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!Movie) {
    return <div>No video found</div>;
  }
  return (
    <div className="relative h-[60.25vw] md:h-[58.25vw] lg:h-[46.25vw]  ">
      <video className="w-full h-[60.25vw] md:h-[58.25vw] lg:h-[46.25vw]  object-cover" autoPlay muted loop poster={Movie?.thumbnailUrl} src={Movie?.trailerUrl}></video>
      <div className="absolute top-[35%] md:top-[50%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full lg:text-6xl font-bold drop-shadow-2xl">
          {Movie?.title}
        </p>
        <p className="text-white  md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {Movie?.description}
        </p>
        <div className="flex flex-row items-center gap-3 mt-3 md:mt-4">
          <PlayButton movieId={Movie.id}/>
        <Button onClick={()=>OnOpen(Movie.id)} className="bg-[rgba(255,255,255,0.7)] text-white rounded-md py-1 md:py-2 px-2 md:px-4 flex flex-row items-center justify-center hover:bg-opacity-50 transition cursor-pointer whitespace-nowrap w-20 md:w-30 lg:w-40 text-sm md:text-md lg:text-lg">
          <IoIosInformationCircleOutline className="text-white" size={16} />
          More Info
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
