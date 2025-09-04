import { IoMdHome } from "react-icons/io";
import { FaClipboardList, FaShoppingCart } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

function MenuList() {
  const location = useLocation();
  const path = location.pathname;
  const isConsumerPath = path === "/consumer" || path.startsWith("/consumer/");
  const isFarmerPath = path === "/farmer" || path.startsWith("/farmer/");
  const isAdminPath = path === "/admin" || path.startsWith("/admin/");

  const navItemClass =
    "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 truncate";

  const iconClass = "text-lg sm:text-xl flex-shrink-0";

  return (
    <div className="w-full flex flex-col overflow-y-auto space-y-2 sm:space-y-3 py-2 sm:py-4 px-1 sm:px-2">
      {/* Home Link */}
      <NavLink
        end
        to={
          isConsumerPath
            ? "/consumer"
            : isFarmerPath
            ? "/farmer"
            : isAdminPath
            ? "/admin"
            : "/unauthorized"
        }
        className={({ isActive }) =>
          `${navItemClass} ${
            isActive ? "bg-green-100 text-green-800" : "text-amber-950"
          } hover:bg-yellow-50 hover:text-green-700`
        }
      >
        <IoMdHome className={iconClass} />
        <span className="truncate">Home</span>
      </NavLink>

      {/* Cart (Only for Consumer) */}
      {isConsumerPath && (
        <NavLink
          to="/consumer/cart"
          end
          className={({ isActive }) =>
            `${navItemClass} ${
              isActive ? "bg-green-100 text-green-800" : "text-amber-950"
            } hover:bg-yellow-50 hover:text-green-700`
          }
        >
          <FaShoppingCart className={iconClass} />
          <span className="truncate">Cart</span>
        </NavLink>
      )}

      {/* Orders */}
      <NavLink
        end
        to={
          isConsumerPath
            ? "/consumer/order"
            : isFarmerPath
            ? "/farmer/order"
            : isAdminPath
            ? "/admin/farmers"
            : "/unauthorized"
        }
        className={({ isActive }) =>
          `${navItemClass} ${
            isActive ? "bg-green-100 text-green-800" : "text-amber-950"
          } hover:bg-yellow-50 hover:text-green-700`
        }
      >
        {isAdminPath ? (
          <FaClipboardList className={iconClass} />
        ) : (
          <IoBagCheck className={iconClass} />
        )}
        <span className="truncate">
          {isConsumerPath || isFarmerPath
            ? "Orders"
            : isAdminPath
            ? "Farmer"
            : ""}
        </span>
      </NavLink>
    </div>
  );
}

export default MenuList;
