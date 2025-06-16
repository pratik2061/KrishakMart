import { Outlet } from "react-router-dom";
import SideMenuBar from "../../components/SideMenuBar";
import { IoMenu } from "react-icons/io5";

function ConsumerHomeLayout() {
  return (
    <div className="w-full h-full ">
      <div className="w-full min-h-screen flex ">
        <div className="min-h-screen lg:block hidden w-[200px] fixed z-10 ">
          <SideMenuBar />
        </div>
        <div className="lg:hidden min-h-screen w-[50px] bg-red-400 flex justify-center fixed ">
          <IoMenu className="text-white text-2xl" />
        </div>
        <div className="w-full  lg:pl-[200px] pl-[50px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ConsumerHomeLayout;
