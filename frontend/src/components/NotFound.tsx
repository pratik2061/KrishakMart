import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-900">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <p className="text-lg mb-6">The page you are looking for doesn’t exist.</p>
      <Button  onClick={() => navigate("/login")}>Go Home</Button>
    </div>
  );
};
