import HomeLogo from "./ui/HomeLogo"
import MenuFooter from "./ui/MenuFooter"
import MenuList from "./ui/MenuList"

function SideMenuBar() {
  return (
    <div className="w-full h-full mx-auto grid grid-rows-[12%_55%_auto] gap-24  ">
      <div className="w-full h-full p-2 flex items-center justify-center">
        <HomeLogo/>
      </div>
      <div className="w-full py-4">
        <MenuList/>
      </div>
      <div className=" w-full px-2  py-4">
        <MenuFooter/>
      </div>
    </div>
  )
}

export default SideMenuBar