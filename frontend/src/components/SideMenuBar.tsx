import HomeLogo from "./consumerComponent/ui/HomeLogo"
import MenuFooter from "./consumerComponent/ui/MenuFooter"
import MenuList from "./consumerComponent/ui/MenuList"

function SideMenuBar() {
  return (
    <div className="w-full h-full mx-auto grid grid-rows-[12%_48%_auto] lg:gap-16 gap-10 lg:pt-0 pt-8  ">
      <div className="w-full h-full p-2 flex items-center justify-center">
        <HomeLogo/>
      </div>
      <div className="w-full py-2">
        <MenuList/>
      </div>
      <div className=" w-full px-2  py-2">
        <MenuFooter/>
      </div>
    </div>
  )
}

export default SideMenuBar