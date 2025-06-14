import { Outlet } from "react-router-dom";
import SideMenuBar from "../../components/SideMenuBar";

function ConsumerHome() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full grid grid-cols-[12%_auto]">
        <div className="bg-yellow-100 h-[100vh]">
          <SideMenuBar />
        </div>
        <div className="bg-green-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ConsumerHome;
