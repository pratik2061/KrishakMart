import { IoMdHome } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

function MenuList() {
  const location = useLocation();
  const path = location.pathname;
  const isConsumerPath = path === "/consumer" || path.startsWith("/consumer/");
  const isFarmerPath = path === "/farmer" || path.startsWith("/farmer/");
  const isAdminPath = path === "/admin" || path.startsWith("/admin/");

  const navItemClass =
    "flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-medium rounded-xl transition-all duration-200";

  const iconClass = "text-xl sm:text-2xl";

  return (
    <div className="w-full space-y-3 sm:space-y-4 py-4 sm:py-6 px-2 sm:px-3">
      {/* Home Link */}
      <NavLink
        to={
          isConsumerPath
            ? "/consumer"
            : isFarmerPath
            ? "/farmer"
            : isAdminPath
            ? "/admin"
            : "/unauthorized"
        }
        end
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
        to={
          isConsumerPath
            ? "/consumer/order"
            : isFarmerPath
            ? "/farmer/order"
            : isAdminPath
            ? "/admin"
            : "/unauthorized"
        }
        end
        className={({ isActive }) =>
          `${navItemClass} ${
            isActive ? "bg-green-100 text-green-800" : "text-amber-950"
          } hover:bg-yellow-50 hover:text-green-700`
        }
      >
        <IoBagCheck className={iconClass} />
        <span className="truncate">
          {isConsumerPath || isFarmerPath ? "Orders" : isAdminPath ? "Admin" : ""}
        </span>
      </NavLink>
    </div>
  );
}

export default MenuList;
