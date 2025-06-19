import { Outlet } from "react-router-dom";
import SideMenuBar from "../../components/SideMenuBar";
import { IoMenu } from "react-icons/io5";

function ConsumerHomeLayout() {
  return (
    <div className="w-full h-full ">
      <div className="w-full h-[100vh] flex ">
        <div className="h-[100vh] lg:block hidden w-[200px] fixed z-10 border-r border-gray-300 ">
          <SideMenuBar />
        </div>
        <div className="lg:hidden min-h-screen w-[50px]  border-r border-gray-300 flex justify-center fixed pt-4 ">
          <IoMenu className="text-black md:text-4xl text-3xl"  />
        </div>
        <div className="w-full  lg:pl-[200px] pl-[50px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ConsumerHomeLayout;
