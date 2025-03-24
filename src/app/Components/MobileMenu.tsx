import React from "react"

interface MobileMenuProps{
    visible:boolean
}
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
    if (!visible) {
        return null;
    }
    return (
        <div className="bg-gray-950 w-56 absolute top-9 left-0 py-5 rounded-md flex flex-col border-2 border-gray-400/30">
            <div className="flex flex-col gap-4 items-center">
            <div className="px-3 text-white tetx-center hover:underline transition">Home</div>
            <div className="px-3 text-white tetx-center hover:underline transition">Series</div>
            <div className="px-3 text-white tetx-center hover:underline transition">Films</div>
            <div className="px-3 text-white tetx-center hover:underline transition">New & Popular</div>
            <div className="px-3 text-white tetx-center hover:underline transition">my List</div>
            <div className="px-3 text-white tetx-center hover:underline transition">Browser By language</div>
            </div>

        </div>
    );
};

export default MobileMenu