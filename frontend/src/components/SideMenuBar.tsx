import HomeLogo from "./consumerComponent/ui/HomeLogo";
import MenuFooter from "./consumerComponent/ui/MenuFooter";
import MenuList from "./consumerComponent/ui/MenuList";

function SideMenuBar() {
  return (
    <div className="w-full h-full mx-auto flex flex-col justify-between gap-8 lg:gap-16 px-4 py-6 sm:px-6 lg:px-4 lg:py-8">
      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <HomeLogo />
      </div>

      {/* Menu List */}
      <div className="flex-1">
        <MenuList />
      </div>

      {/* Footer */}
      <div>
        <MenuFooter />
      </div>
    </div>
  );
}

export default SideMenuBar;
