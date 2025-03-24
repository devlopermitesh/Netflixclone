interface NavbarItemsProps{
Label:String
}
const NavbarItems=({Label}:NavbarItemsProps)=>{
return (
    <div className="text-white hover:text-gray-500 cursor-pointer transition">{Label}</div>
)
}
export default NavbarItems;