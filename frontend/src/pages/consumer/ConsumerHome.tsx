import { Outlet } from "react-router-dom";
import SideMenuBar from "../../components/SideMenuBar";

function ConsumerHome() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full grid grid-cols-[20%_auto]">
        <div className="bg-red-50">
          <SideMenuBar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ConsumerHome;
