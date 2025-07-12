import { IoMdHome } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function MenuList() {
  const location = useLocation();
  const path = location.pathname;
  const isConsumerPath = path === "/consumer" || path.startsWith("/consumer/");
  const isFarmerPath = path === "/farmer" || path.startsWith("/farmer/");
  const isAdminPath = path === "/admin" || path.startsWith("/admin/");

  const navItemClass =
    "flex items-center w-full gap-4 px-4 py-3 text-lg font-medium rounded-xl transition-all duration-200";

  const iconClass = "text-2xl";

  return (
    <div className="w-full h-full space-y-4 py-6 px-2">
      <NavLink
        to={isConsumerPath? '/consumer' : isFarmerPath ? '/farmer' : isAdminPath ? '/admin' : '/unauthorized'}
        end
        className={({ isActive }) =>
          `${navItemClass} ${
            isActive ? "bg-green-100 text-green-800" : "text-amber-950"
          } hover:bg-yellow-50 hover:text-green-700`
        }
      >
        <IoMdHome className={iconClass} />
        <p>Home</p>
      </NavLink>

      <NavLink
        to={isConsumerPath? '/consumer/cart' : isFarmerPath ? '/farmer/product' : isAdminPath ? '/admin' : '/unauthorized'}
        end
        className={({ isActive }) =>
          `${navItemClass} ${
            isActive ? "bg-green-100 text-green-800" : "text-amber-950"
          } hover:bg-yellow-50 hover:text-green-700`
        }
      >
        <FaShoppingCart className={iconClass} />
        <p>{isConsumerPath ? 'Cart' : isFarmerPath ? 'Farmer' : isAdminPath ? "Admin" : null}</p>
      </NavLink>

      <NavLink
        to={isConsumerPath? '/consumer/order' : isFarmerPath ? '/farmer/order' : isAdminPath ? '/admin' : '/unauthorized'}
        end
        className={({ isActive }) =>
          `${navItemClass} ${
            isActive ? "bg-green-100 text-green-800" : "text-amber-950"
          } hover:bg-yellow-50 hover:text-green-700`
        }
      >
        <IoBagCheck className={iconClass} />
        <p>{isConsumerPath ? 'Orders' : isFarmerPath ? 'Farmer' : isAdminPath ? "Admin" : null}</p>
      </NavLink>
    </div>
  );
}

export default MenuList;
