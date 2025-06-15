import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { logoutAuthAxios } from "../../api/consumer/consumerAuth/auth";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../auth/slice/Auth-slice";
import { toast } from "react-toastify";

interface LogoutResponse {
  data: {
    message: string;
  };
}

function MenuFooter() {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const logoutResponse = (await logoutAuthAxios()) as LogoutResponse;
      const message = logoutResponse.data.message;
      dispatch(logoutUser());
      toast(message, {
        type: "success",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      const ErrorMessage = error as LogoutResponse;
      toast(ErrorMessage.data.message, {
        type: "error",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="w-full h-full space-y-4">
      <div className="px-2 py-2 ">
        <NavLink
          to={"/consumer/profile"}
          className={({ isActive }) =>
            `flex space-x-4 hover:cursor-pointer ${
              isActive ? "text-green-900" : " text-amber-950"
            }`
          }
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
          to={"/login"}
          className={({ isActive }) =>
            `flex space-x-4 hover:cursor-pointer ${
              isActive ? "text-green-900" : " text-amber-950"
            }`
          }
        >
          <IoLogOut className="text-2xl" />
          <span className="text-xl font-bold">Logout</span>
        </NavLink>
      </div>
    </div>
  );
}

export default MenuFooter;
