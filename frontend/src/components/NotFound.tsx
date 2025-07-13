import { Button } from "@radix-ui/themes";
import { useLocation, useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const location = useLocation();
  const path = location.pathname;
  const isConsumerPath = path === "/consumer" || path.startsWith("/consumer/");
  const isFarmerPath = path === "/farmer" || path.startsWith("/farmer/");
  const isAdminPath = path === "/admin" || path.startsWith("/admin/");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-900">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <p className="text-lg mb-6  px-8 text-justify">The page you are looking for doesn’t exist.</p>
      <Button  onClick={() => isConsumerPath || isAdminPath ? navigate('/login') : isFarmerPath? navigate('/farmer/login') : navigate('/login')}>Go Home</Button>
    </div>
  );
};
