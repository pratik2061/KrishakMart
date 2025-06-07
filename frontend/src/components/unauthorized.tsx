import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-50 text-yellow-900">
      <h1 className="text-6xl font-bold mb-4">401</h1>
      <p className="text-2xl mb-6">Unauthorized Access</p>
      <p className="text-lg mb-6">You do not have permission to view this page.</p>
      <Button onClick={() => navigate("/login")}>Go Home</Button>
    </div>
  );
};