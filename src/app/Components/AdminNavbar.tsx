import { FaMonero, FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { IoCloudUpload } from "react-icons/io5";

import Button from "./Button";
import { useuploadModel } from "@/hook/useUploadModel";
const Navbar = () => {
  const {isOpen,onClose,onOpen}=useuploadModel()
  const islightMode = false;
 
  return (
    <nav className="w-[calc(100%-300px)] z-40 fixed ">
      <div className="flex flex-row items-center transition bg-zinc-900 bg-opacity-90 px-4 md:px-16 text-white py-3 border-white">
        <h2 className="text-3xl font-semibold flex-1">
          Hello Mitesh<span className="animate-wave">👋</span>
        </h2>

        {/* Icons Container */}

        <div className="flex flex-row items-center  h-full ml-auto space-x-4 flex-2 justify-between  ">
          {/* seach Movie */}
          <div className="hidden lg:flex flex-row items-center  transition px-6 flex-3 relative ">
            <input placeholder="Search Movie.." className=" relative w-full h-10 p-3 py-3 rounded-full bg-white text-black right-1" />
            <span className="relative flex items-center justify-center p-3 rounded-full bg-white text-black border-2 border-black right-12">
              <IoSearchOutline />
            </span>
          </div>
          <div className="flex flex-row items-center  h-full ml-auto space-x-4 flex-1">
          <span className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100/50 text-white lg:hidden ">
            <IoSearchOutline size={22}/>
          </span>
          {/* Light/Dark Mode Toggle */}

          <span className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100/50 text-white">
            {islightMode ? <FaSun  size={22} /> : <FaMoon size={22} />}
          </span>

          {/* Notification Bell */}
          <span className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100/50 text-white">
            <FaRegBell  size={24} />
          </span>
      <Button
        className={`flex rounded-md px-5 shadow-2xl cursor-pointer ${
          isOpen ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-red-500 text-white"
        }`}
        disabled={isOpen}
        onClick={() => onOpen()}
      >
        <span className="flex items-center justify-center rounded-md hover:bg-gray-100/50">
          <IoCloudUpload size={24} />
          Upload_Movie
        </span>
      </Button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
