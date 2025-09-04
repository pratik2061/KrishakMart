import HomeLogo from "./consumerComponent/ui/HomeLogo";
import MenuFooter from "./consumerComponent/ui/MenuFooter";
import MenuList from "./consumerComponent/ui/MenuList";

function SideMenuBar() {
  return (
    <div className="flex flex-col justify-between h-full lg:h-screen w-full px-2 sm:px-4 py-2 sm:py-4">
      {/* Logo */}
      <div className="flex justify-center items-center mb-2 sm:mb-4">
        <HomeLogo />
      </div>

      {/* Menu - scrollable if needed */}
      <div className="flex-1 overflow-y-auto">
        <MenuList />
      </div>

      {/* Footer */}
      <div className="mt-2 sm:mt-4">
        <MenuFooter />
      </div>
    </div>
  );
}

export default SideMenuBar;
