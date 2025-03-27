"use client"
import useSWR from "swr";
import fetcher from "../../lib/Fetcher";

const useFavoritemovies=()=>{
const { data: MovieData, isLoading:isfavloading, error, mutate } = useSWR("/api/favorites", fetcher);
return { MovieData, isfavloading, error, mutate };

}

export default useFavoritemovies;