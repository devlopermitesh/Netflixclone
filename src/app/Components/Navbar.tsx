"use client"
import Image from "next/image";
import Logo from "@/assets/images/NetflixLogo.png"
import NavbarItems from "./NavbarItems";
import { FaChevronDown } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import Avatar from "boring-avatars"
import AccountMenu from "./AccountMenu";
const Navbar=()=>{
    const [IsvisibleMobileMenu,setIsvisibleMobileMenu]=useState(false)
    const [IsvisibleAccountMenu,setIsvisibleAccountMenu]=useState(false)
return (
    <nav className="w-full z-40 fixed">
<div className="flex flex-row items-center transition bg-zinc-900 bg-opacity-90 px-4 md:px-16 py-2">
<Image src={Logo} alt="App Logo" height={100} width={100} className=""/>
<div className="hidden flex-row ml-9 gap-7 lg:flex">
<NavbarItems Label={"Home"}/>
<NavbarItems Label={"Series"}/>
<NavbarItems Label={"films"}/>
<NavbarItems Label={"New & Popular"}/>
<NavbarItems Label={"My List"}/>
<NavbarItems Label={"Browser by language"}/>
</div>
<div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
<p className="text-white text-sm">Browser</p>
<FaChevronDown className={`text-white transition ${(IsvisibleMobileMenu)?"rotate-180":"rotate-0"}`} onClick={()=>setIsvisibleMobileMenu((prev)=>!prev)}/>
<MobileMenu visible={IsvisibleMobileMenu} />
</div>
{/* //options */}
<div className="flex flex-row items-center ml-auto gap-7">
<div className="text-gray-200 hover:text-gray-200 cursor-pointer">
<BsSearch size={20}/>
</div>
<div className="text-gray-200 hover:text-gray-200 cursor-pointer">
<BsBell size={20} />
</div>
{/* profiles */}
<div className="flex flex-row items-center cursor-pointer relative">
<div className="w-6 h-6 lg:w-10 lg:h-10 overflow-hidden flex items-center justify-center border-2 border-gray-500/90 rounded-md ">
    <Avatar
        size={40}
        name={`Mitesh`}
        variant="beam" // Options: "marble", "beam", "pixel", "sunset", "ring", "bauhaus"
        square // Added prop for square shape
        colors={["#FF5733", "#3498db", "#2ecc71", "#F4D03F", "#8E44AD"]}
        className="rounded-md"
    />
</div>
<FaChevronDown className={`text-white transition ${(IsvisibleAccountMenu)?"rotate-180":"rotate-0"}`} onClick={()=>setIsvisibleAccountMenu((prev)=>!prev)}/>
<AccountMenu visible={IsvisibleAccountMenu}/>
</div>
</div>
</div>
    </nav>
)
}
export default Navbar;