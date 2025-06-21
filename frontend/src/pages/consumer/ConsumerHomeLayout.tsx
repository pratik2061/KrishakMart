import { NavLink, Outlet } from "react-router-dom";
import SideMenuBar from "../../components/SideMenuBar";
import { IoBagCheck, IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import krishakMart_logo from "/krishakMart_Logo.jpg";
import MenuFooter from "../../components/consumerComponent/ui/MenuFooter";
import { IoMdHome } from "react-icons/io";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";

function ConsumerHomeLayout() {
  const [mobileScreenMenu, setMobileScreenMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMobileScreenMenu(!mobileScreenMenu);
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className="hidden lg:block w-[200px] h-full fixed z-10 border-r border-gray-300">
        <SideMenuBar />
      </div>

      <div className="lg:hidden  fixed w-[50px] h-screen z-50 border-r border-gray-300 flex justify-center pt-4">
        {!mobileScreenMenu && (
          <IoMenu
            onClick={toggleMobileMenu}
            className="text-black md:text-4xl text-3xl cursor-pointer"
          />
        )}
      </div>

      <div
        className={`fixed lg:hidden top-0 left-[50px] w-[250px] h-screen bg-white z-40 shadow-md transition-transform duration-300 origin-left ${
          mobileScreenMenu ? "scale-100" : "scale-0"
        }`}
      >
        <IoClose
          onClick={toggleMobileMenu}
          className="text-3xl cursor-pointer absolute right-2 top-2 "
        />
        <div className="p-4">
          <div className="grid grid-rows-[30%_50%_auto]">
            <div className="flex justify-center items-center w-full pt-2 ">
              <img src={krishakMart_logo} className="overflow-hidden " />
            </div>
            <div className="w-full h-full space-y-4 py-4 mx-1 px-1">
              <div className="w-full text-xl font-bold flex  px-2 py-2 ">
                <NavLink
                  onClick={toggleMobileMenu}
                  to={"/consumer"}
                  className={` text-amber-950
             flex flex-wrap w-full space-x-4  hover:text-green-700`}
                >
                  <IoMdHome className="text-3xl " />
                  <p className="">Home</p>
                </NavLink>
              </div>

              <div className="w-full text-xl font-bold flex space-x-4  px-2 py-2">
                <NavLink
                  onClick={toggleMobileMenu}
                  to={"/consumer/cart"}
                  className={` text-amber-950
            flex flex-wrap w-full space-x-4 hover:text-green-700 `}
                >
                  <FaShoppingCart className="text-3xl " />
                  <p className="">Cart</p>
                </NavLink>
              </div>
              <div className="w-full text-xl font-bold flex space-x-4  px-2 py-2">
                <NavLink
                  onClick={toggleMobileMenu}
                  to={"/consumer/order"}
                  className={`  text-amber-950
             flex flex-wrap w-full space-x-4 hover:text-green-700 
              `}
                >
                  <IoBagCheck className="text-3xl " />
                  <p className="">Orders</p>
                </NavLink>
              </div>
            </div>
            <div className="px-2 py-2 ">
              <NavLink
                onClick={toggleMobileMenu}
                to={"/consumer/profile"}
                className={`flex space-x-4 hover:cursor-pointer  hover:text-green-700  text-amber-950 
                        }`}
              >
                <FaUserAlt className="text-2xl" />
                <span className="text-xl font-bold">Profile</span>
              </NavLink>
            </div>
            <MenuFooter />
          </div>
        </div>
      </div>

      <div className="w-full h-full overflow-y-auto lg:pl-[200px] pl-[50px]">
        <Outlet />
      </div>
    </div>
  );
}

export default ConsumerHomeLayout;
