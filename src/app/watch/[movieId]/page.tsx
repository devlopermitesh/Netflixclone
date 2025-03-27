"use client";

import useWatchMovie from "@/hook/usewatchMovie";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

const WatchMovie: React.FC = () => {
  const router = useRouter();
  const { movieId } = useParams();
  const [bgVisible, setBgVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { data, error, isLoading } = useWatchMovie(movieId as string);
  const Movie = data?.data; 
  // Fullscreen Logic
  const handleFullscreen = async () => {
    const videoElement = document.querySelector("video");
    if (!videoElement) return;

    if (!isFullscreen) {
      try {
        await videoElement.requestFullscreen();
        if (screen.orientation && "lock" in screen.orientation) {
        }
        setIsFullscreen(true);
      } catch (err) {
        console.log("Fullscreen nahi chala:", err);
      }
    } else {
      document.exitFullscreen();
      if (screen.orientation && "unlock" in screen.orientation) {
        screen.orientation.unlock();
      }
      setIsFullscreen(false);
    }
  };

  // Background Toggle Logic
  useEffect(() => {
    const video = document.querySelector("video");
    if (!video) return;

    const hideBg = () => setBgVisible(false);
    const showBg = () => setBgVisible(true);

    video.addEventListener("play", hideBg);
    video.addEventListener("pause", showBg);

    return () => {
      video.removeEventListener("play", hideBg);
      video.removeEventListener("pause", showBg);
    };
  }, []);

  // Render Logic
  if (isLoading) {
    return <div className="text-white">Loading bhai...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error aa gaya: {error.message}</div>;
  }

  return (
    <div className="absolute h-screen w-screen flex flex-col bg-black">
      <nav
        className={`flex flex-row items-center transition text-white bg-opacity-90 px-2 md:px-6 py-2 ${
          bgVisible ? "bg-zinc-900" : "bg-transparent"
        }`}
      >
        <span className="flex flex-row items-center gap-1 text-2xl">
          <IoArrowBackOutline
            size={30}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          Watching:
          <h3 className="text-white font-semibold my-auto">
            {Movie?.title || "Movie Title"}
          </h3>
        </span>
      </nav>

      <video
        className="w-full h-full object-contain"
        autoPlay
        controls
        poster={Movie?.thumbnailUrl}
        src={Movie?.trailerUrl}
        onClick={handleFullscreen}
      />
    </div>
  );
};

export default WatchMovie;