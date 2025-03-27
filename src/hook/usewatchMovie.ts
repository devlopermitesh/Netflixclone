"use client"
import fetcher from "../../lib/Fetcher";
import useSWR from "swr";

const useWatchMovie=(id:string)=>{
const {data,isLoading,error}=useSWR(id?`/api/watch/${id}`:null,fetcher,{
    revalidateIfStale:false,
    revalidateOnFocus:false,
    revalidateOnReconnect:false
})
return {data,isLoading,error}
}
export default useWatchMovie;

