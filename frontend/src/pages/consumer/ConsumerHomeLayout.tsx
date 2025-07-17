import { NavLink, Outlet } from "react-router-dom";
import SideMenuBar from "../../components/SideMenuBar";
import { IoBagCheck, IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import krishakMart_logo from "/krishakMart_Logo.jpg";
import MenuFooter from "../../components/consumerComponent/ui/MenuFooter";
import { IoMdHome } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";

function ConsumerHomeLayout() {
  const [mobileScreenMenu, setMobileScreenMenu] = useState(false);

  const toggleMobileMenu = () => {
    setMobileScreenMenu(!mobileScreenMenu);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Layout container */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-[200px] h-full fixed top-0 left-0 border-r border-gray-300 bg-white z-20">
          <SideMenuBar />
        </aside>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-300 z-30 flex items-center justify-between px-4 shadow-sm">
          <button
            onClick={toggleMobileMenu}
            className="menu-toggle p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <IoMenu className="text-2xl text-gray-700" />
          </button>
          <div className="flex items-center">
            <img
              src={krishakMart_logo}
              className="h-8 w-auto rounded-md"
              alt="KrishakMart Logo"
            />
            <span className="ml-2 font-semibold text-gray-800">
              KrishakMart
            </span>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Sidebar Drawer - Mobile */}
        <div
          className={`mobile-menu fixed lg:hidden top-0 left-0 w-[280px] h-full bg-white z-50 shadow-2xl transition-transform duration-300 transform ${
            mobileScreenMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center">
              <img
                src={krishakMart_logo}
                className="h-10 w-auto rounded-md shadow-sm"
                alt="KrishakMart Logo"
              />
              <div className="ml-3">
                <h2 className="font-bold text-gray-800">KrishakMart</h2>
                <p className="text-xs text-gray-600">Consumer Dashboard</p>
              </div>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IoClose className="text-xl text-gray-600" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-4 py-6 space-y-2">
              <NavLink
                end
                onClick={toggleMobileMenu}
                to="/consumer"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  }`
                }
              >
                <IoMdHome className="text-xl" />
                <span>Home</span>
              </NavLink>
              <NavLink
                end
                onClick={toggleMobileMenu}
                to="/consumer/cart"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  }`
                }
              >
                <IoBagCheck className="text-xl" />
                <span>Cart</span>
              </NavLink>

              <NavLink
                end
                onClick={toggleMobileMenu}
                to="/consumer/order"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  }`
                }
              >
                <IoBagCheck className="text-xl" />
                <span>Orders</span>
              </NavLink>

              <NavLink
                end
                onClick={toggleMobileMenu}
                to="/consumer/profile"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  }`
                }
              >
                <FaUserAlt className="text-xl" />
                <span>Profile</span>
              </NavLink>
              <MenuFooter />
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto lg:ml-[200px] ml-0 pt-16 lg:pt-0 bg-slate-50">
          <div className="min-h-[calc(100vh-160px)] px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ConsumerHomeLayout;
