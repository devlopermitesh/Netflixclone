import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Authoptions } from "@/app/api/auth/[...nextauth]/options"; 
import Navbar from "@/app/Components/Navbar";
import Billboard from "@/app/Components/BillBoard";
import MainContent from "@/app/Components/MainContent";
import Information from "./Information";

export default async function Page() {
  const session = await getServerSession(Authoptions);
  if (!session) {
    redirect("/sign-in"); 
  }

  console.log("Session",session)
  return (<>
    <div className="absolute w-full h-full flex flex-col">
<Navbar/>
<Billboard/>
<MainContent/>
    </div>
<Information/>

    </>
  );
}