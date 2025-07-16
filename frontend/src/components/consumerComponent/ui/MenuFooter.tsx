import { FaUserAlt } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { logoutAuthAxios } from "../../../api/consumer/consumerAuth/auth";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../auth/slice/Auth-slice";
import { toast } from "react-toastify";

interface LogoutResponse {
  data: {
    message: string;
  };
}

function MenuFooter() {
  const location = useLocation();
  const path = location.pathname;
  const isConsumerPath = path === "/consumer" || path.startsWith("/consumer/");
  const isFarmerPath = path === "/farmer" || path.startsWith("/farmer/");
  const isAdminPath = path === "/admin" || path.startsWith("/admin/");
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const logoutResponse = (await logoutAuthAxios()) as LogoutResponse;
      const message = logoutResponse.data.message;
      dispatch(logoutUser());
      toast(message, {
        type: "success",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      const ErrorMessage = error as LogoutResponse;
      toast(ErrorMessage.data.message, {
        type: "error",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="w-full h-full space-y-4">
      <div className="px-2 py-2 lg:block hidden">
        <NavLink
          to={
            isConsumerPath
              ? "/consumer/profile"
              : isFarmerPath
              ? "/farmer/profile"
              : isAdminPath
              ? "/admin/profile"
              : "/unauthorized"
          }
          className={`flex space-x-4 hover:cursor-pointer  hover:text-green-700  text-amber-950 
            }`}
        >
          <FaUserAlt className="text-2xl" />
          <span className="text-xl font-bold">Profile</span>
        </NavLink>
      </div>
      <div className="w-full  px-2 py-2">
        <NavLink
          onClick={() => {
            logout();
          }}
          to={
            isConsumerPath
              ? '/login'
              : isFarmerPath
              ? "/farmer/login"
              : isAdminPath
              ? '/login'
              : "/unauthorized"
          }
          className={`flex space-x-4 hover:cursor-pointer hover:text-red-700  text-red-600
            }`}
        >
          <IoLogOut className="text-2xl" />
          <span className="text-xl font-bold">Logout</span>
        </NavLink>
      </div>
    </div>
  );
}

export default MenuFooter;
