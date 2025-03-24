"use client"
import useSWR from 'swr'
import fetcher from "../../lib/Fetcher";
export function useCurrentUser() {
const { data, error, isLoading, mutate } = useSWR("/api/me", fetcher,{
    revalidateOnFocus: false, // Avoid extra requests
    revalidateOnReconnect: false,
    onError: (err) => console.error("SWR Fetch Error:", err.message, err),
    onSuccess: (data) => console.log("SWR Fetch Success:", data),
  });
return { data, error ,isLoading,mutate}
}

