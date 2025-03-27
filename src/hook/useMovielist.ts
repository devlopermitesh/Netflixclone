"use client"
import useSWR from "swr"
import fetcher from "../../lib/Fetcher"

const useMovielist=()=>{
     
    const {data,isLoading,error,mutate}=useSWR("/api/movies",fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false
    })

return {data,isLoading,error,mutate}   
        
}

export default useMovielist;