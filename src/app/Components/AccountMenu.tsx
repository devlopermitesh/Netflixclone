import Avatar from "boring-avatars"
import { signOut } from "next-auth/react"

const AccountMenu=({visible}:{visible:boolean})=>{
    if(!visible){
return (null)
    }
return(
    <div className="bg-gray-950 w-56 absolute top-9 right-4 py-5 rounded-md 
    flex flex-col border-2 border-gray-400/30">
       <div className="flex flex-col gap-3">
       <div className="px-3 group/item flex flex-row gap-3 items-center justify-center w-full">
    <Avatar
        size={30}
        name={`Mitesh`}
        variant="beam" // Options: "marble", "beam", "pixel", "sunset", "ring", "bauhaus"
        square // Added prop for square shape
        colors={["#FF5733", "#3498db", "#2ecc71", "#F4D03F", "#8E44AD"]}
        className="rounded-md"
    />
    <p className="text-white text-sm group-hover/item:underline transition">Mitesh </p>
</div>
<hr className="bg-gray-400  border-1 border-gray-300/50 w-[70%] mx-auto">
</hr>
<div className="px-3 text-center text-white text-sm hover:underline" onClick={()=>signOut()}>
    Signup Out of Netflix
</div>
       </div>
    </div>
)
}
export default AccountMenu