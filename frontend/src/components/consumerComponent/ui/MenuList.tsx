import { IoMdHome } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function MenuList() {
  return (
    <div className="w-full h-full space-y-4 py-4 mx-1 px-1">
      <div className="w-full text-xl font-bold flex  px-2 py-2 ">
        <NavLink
          to={"/consumer"}
          className={({ isActive }) =>
            `${
              isActive ? "text-green-900  " : "text-amber-900"
            } flex flex-wrap w-full space-x-4  hover:text-green-700`
          }
        >
          <IoMdHome className="text-3xl " />
          <p className="">Home</p>
        </NavLink>
      </div>

      <div className="w-full text-xl font-bold flex space-x-4  px-2 py-2">
        <NavLink
          to={"/consumer/cart"}
          className={({ isActive }) =>
            `${
              isActive ? "text-green-900" : "text-amber-900"
            } flex flex-wrap w-full space-x-4 hover:text-green-700 `
          }
        >
          <FaShoppingCart className="text-3xl " />
          <p className="">Cart</p>
        </NavLink>
      </div>
      <div className="w-full text-xl font-bold flex space-x-4  px-2 py-2">
        <NavLink
          to={"/consumer/order"}
          className={({ isActive }) =>
            `${
              isActive ? "text-green-900" : "text-amber-900"
            } flex flex-wrap w-full space-x-4 hover:text-green-700 
              `
          }
        >
          <IoBagCheck className="text-3xl " />
          <p className="">Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default MenuList;
