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

  const navItemClass =
    "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 truncate";

  const iconClass = "text-lg sm:text-xl flex-shrink-0";

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
    <div className="w-full flex flex-col sm:flex-col gap-2 sm:gap-3 py-2 sm:py-4 px-2 sm:px-3">
      {/* Profile link */}
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
        className={({ isActive }) =>
          `${navItemClass} ${
            isActive ? "bg-green-100 text-green-800" : "text-amber-950"
          } hover:bg-yellow-50 hover:text-green-700 hidden lg:flex`
        }
      >
        <FaUserAlt className={iconClass} />
        <span className="truncate">Profile</span>
      </NavLink>

      {/* Logout link */}
      <NavLink
        onClick={logout}
        to={
          isConsumerPath
            ? "/login"
            : isFarmerPath
            ? "/farmer/login"
            : isAdminPath
            ? "/login"
            : "/unauthorized"
        }
        className={({ isActive }) =>
          `${navItemClass} ${
            isActive ? "bg-red-100 text-red-700" : "text-red-600"
          } hover:bg-red-50 hover:text-red-700`
        }
      >
        <IoLogOut className={iconClass} />
        <span className="truncate">Logout</span>
      </NavLink>
    </div>
  );
}

export default MenuFooter;
