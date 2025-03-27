"use client";
import { useCurrentUser } from "@/hook/useCurrentuser";
import useFavoritemovies from "@/hook/useFavoritemovies";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";

interface FavoriteMovieButtonProps {
    MovieId: string;
}

const FavoriteMovieButton: React.FC<FavoriteMovieButtonProps> = ({ MovieId }) => {
    const { data: user, mutate: userMutate } = useCurrentUser();
    const { MovieData, mutate: favMutate } = useFavoritemovies();

    // ✅ Check if movie is in favorites
    const isFavMovie = useMemo(() => {
        return user?.favoritesIds?.includes(MovieId) || false;
    }, [user, MovieId]);

    // ✅ Optimized Toggle Function
    const toggleFunction = useCallback(async () => {
        try {
            if (isFavMovie) {
                await axios.delete("/api/favorite", { data: { MovieId } });
                toast.success("Movie removed from favorites");
            } else {
                await axios.post("/api/favorite", { MovieId });
                toast.success("Movie added to favorites");
            }

            // ✅ Immediately update UI by revalidating data
            userMutate();
            favMutate();

        } catch (error: any) {
            toast.error(error.response?.data?.error || "Something went wrong!");
        }
        
    }, [isFavMovie, MovieId, userMutate, favMutate]);

    return (
        <div 
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 flex rounded-full justify-center items-center transition hover:border-neutral-300"
            onClick={toggleFunction}
        >
            {isFavMovie ? <IoMdCheckmark size={28} className="text-white" /> : <FaPlus size={28} className="text-white" />}
        </div>
    );
};

export default FavoriteMovieButton;
