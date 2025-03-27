"use client";

import useInfoModal from "@/hook/useInfoModel";
import useWatchMovie from "@/hook/usewatchMovie";
import { AiOutlineClose } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { VideoData } from "./BillBoard";
import PlayButton from "./Playbutton";
import FavoriteMovieButton from "./FavMovieButton";

interface InfoModelProps {
  visible?: boolean;
  onclose: () => void;
}

const InfoModel: React.FC<InfoModelProps> = ({ visible, onclose }) => {
  const [Isvisible, setIsvisible] = useState<boolean>(false);
  const { MovieId, OnClose } = useInfoModal();
  const { data, error, isLoading } = useWatchMovie(MovieId!);
  const Movie = data?.data as VideoData;

  useEffect(() => {
    setIsvisible(visible!);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsvisible(false);
    setTimeout(() => {
      OnClose();
    }, 300);
  }, [OnClose]);

  if (!visible) {
    return null;
  }

  console.log("Movie", Movie);

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 transition duration-300 overflow-x-hidden overflow-y-auto">
      <div className="relative w-full max-w-3xl mx-4 rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out">
        <div
          className={`${
            Isvisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          } bg-zinc-900`}
        >
          {/* Video Section */}
          <div className="relative h-64 md:h-80">
            <video
              className="w-full h-full object-cover brightness-75"
              autoPlay
              muted
              loop
              poster={Movie?.thumbnailUrl}
              src={Movie?.trailerUrl}
            />
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 h-10 w-10 flex items-center justify-center rounded-full bg-black bg-opacity-70 hover:bg-opacity-90 transition"
            >
              <AiOutlineClose className="text-white" size={22} />
            </button>
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg">
                {Movie?.title || "No Title"}
              </h3>
              <div className="flex flex-row gap-3 mt-3">
                <PlayButton movieId={Movie?.id} key={Movie?.id} />
                <FavoriteMovieButton MovieId={Movie?.id} />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="px-6 py-4 md:px-8 md:py-6">
            <p className="text-green-400 font-semibold">
              New <span className="text-white">2025</span>
            </p>
            <div className="flex flex-row items-center gap-4 mt-2 text-white text-sm md:text-base">
              <p>{Movie?.duration || "N/A"}</p>
              <p>Genre: {Movie?.genre || "Unknown"}</p>
            </div>
            <p className="text-white text-sm md:text-base mt-4 leading-relaxed">
              {Movie?.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModel;