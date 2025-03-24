"use client";

import AdminNavbar from "@/app/Components/AdminNavbar";
import Sidebar from "@/app/Components/Sidebar";
import { useCurrentUser } from "@/hook/useCurrentuser";
import { redirect } from "next/navigation";
import ModalProvider from "@/Providers/ModelProvider";
type Props = {
  initialData: any; // Adjust type based on your session.user structure
};

export default  function ClientAdminPage({ initialData }: Props) {
  const { data, error, isLoading, mutate } = useCurrentUser();
  const user = data || initialData; // Fallback to initialData if useSWR hasn't fetched yet

  if (isLoading && !initialData) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log("Data ",data)
  if (!isLoading && data && data.role !== "Admin") {
    redirect("/sign-in");
  }

  return (
    <div className="absolute w-full h-full flex flex-col">
       <ModalProvider/>
    <Sidebar>
      <AdminNavbar/>
    {/* Add more UI here */}
      </Sidebar>
    </div>
  );
}