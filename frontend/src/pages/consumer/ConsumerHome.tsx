import { Outlet } from "react-router-dom";
import SideMenuBar from "../../components/SideMenuBar";
import {IoMenu} from 'react-icons/io5'

function ConsumerHome() {
  return (
    <div className="w-full h-full">
      <div className="w-full min-h-screen grid lg:grid-cols-[14%_auto] grid-cols-[10%_auto]">
        <div className="min-h-screen lg:block hidden ">
          <SideMenuBar />
        </div>
        <div className="lg:hidden  w-full flex  justify-center ">
          <IoMenu/>
        </div>
        <div className="bg-green-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ConsumerHome;
