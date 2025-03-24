import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Authoptions } from "@/app/api/auth/[...nextauth]/options";
import ClientAdminPage from "./ClientAdminPage";

export default async function AdminPage() {
  const session = await getServerSession(Authoptions);
  
  if (!session) {
    redirect("/sign-in");
  }

  // Optional: Initial data fetch server-side (if needed)
  const initialData = session.user; // Assuming session.user has basic data

  return <ClientAdminPage initialData={initialData} />;
}