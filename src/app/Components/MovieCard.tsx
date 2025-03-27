import React from 'react';
import { VideoData } from './BillBoard';
import Image from 'next/image';
import { FaPlay } from "react-icons/fa";
import FavoriteMovieButton from './FavMovieButton';
import { useRouter } from 'next/navigation';
interface MovieCardProps {
  data: VideoData;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router=useRouter()
  return (
    <div className="group  col-span relative h-[12vw]">
      {/* Thumbnail Image */}
      <img
        src={data.thumbnailUrl}
        alt={`${data.title} Poster`}
        className="cursor-pointer object-cover transition-shadow duration-200 shadow-xl rounded-md w-full h-[12vw] group-hover:opacity-0 sm:group-hover:opacity-0"
      />

      {/* Hover Effect */}
      <div
        className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:group-hover:visible sm:group-hover:opacity-100 
        w-full scale-0 group-hover:scale-110
        group-hover:-translate-y-[2vw] group-hover:translate-x-[2vw]"
      >
        <Image
          src={data.thumbnailUrl}
          alt={`${data.title} Poster`}
          width={100} height={100}
          className="cursor-pointer object-cover transition-shadow duration-200 shadow-xl rounded-t-md w-full h-[12vw]"
        />
        <div className='w-full bg-zinc-800 z-10 p-2 lg-p-4 absolute transition shadow-md rounded-b-md'>
<div className='flex flex-row items-center gap-4'>
{/* //button play  */}
<div className='flex flex-col items-center justify-center w-6 h-6 lg:w-10 lg:h-10 rounded-full bg-white text-black cursor-pointer hover:bg-neutral-300 p-2' onClick={()=>{}}>
<FaPlay onClick={()=>router.push(`/watch/${data?.id}`)} size={30}/>
</div>
<FavoriteMovieButton MovieId={data?.id}></FavoriteMovieButton>

</div>
<p className='text-green-400 font-semibold mt-4'>
    New
    <span className='text-white'> 2025</span>
    </p>
<div className='flex flex-row items-center font-semibold mt-4 text-center gap-2'>
<p className='text-white text-[10px] lg:text-sm'>{data.duration}</p>
</div>

<div className='flex flex-row items-center font-semibold mt-4 text-center gap-2'>
<p className='text-white text-[10px] lg:text-sm'>{"Genre: "+data.genre}</p>
</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
