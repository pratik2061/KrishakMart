import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import AdminHome from "./pages/admin/AdminHome";
import FarmerHome from "./pages/farmer/FarmerHome";
import { UnauthorizedPage } from "./components/unauthorized";
import { NotFoundPage } from "./components/NotFound";
import ConsumerHomeLayout from "./pages/consumer/ConsumerHomeLayout";
import ConsumerHome from "./pages/consumer/ConsumerHome";
import ConsumerCartSection from "./pages/consumer/ConsumerCartSection";
import ConsumerOrderSection from "./pages/consumer/ConsumerOrderSection";
import FarmerLogin from "./components/authComponent/FarmerAuthLogin";
import { FarmerProtectedRoutes } from "./components/FarmerProtectedRoutes";
import FarmerHomeLayout from "./pages/farmer/FarmerHomeLayout";
import AddProductForm from "./components/farmerComponent/ui/FarmerAddProduct";
import EditProductForm from "./components/farmerComponent/ui/FarmerEditProduct";
import FarmerOrderSection from "./pages/farmer/FarmerOrderSection";
import KhaltiResponse from "./components/VerifyingPaymentResponse";
import UpdateOrderComponent from "./components/farmerComponent/ui/FarmerUpdateProduct";
import FarmerSignup from "./components/authComponent/FarmerAuthSignUp";
import Signup from "./pages/auth/Signup";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/signup" element={<FarmerSignup />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<ProtectedRoutes allowableRoles="ADMIN" />}>
          <Route path="/admin">
            <Route index element={<AdminHome />} />
          </Route>
        </Route>

        <Route element={<FarmerProtectedRoutes allowableRoles="FARMER" />}>
          <Route path="/farmer" element={<FarmerHomeLayout />}>
            <Route index element={<FarmerHome />} />
            <Route path="product/add" element={<AddProductForm />} />
            <Route path="product/edit" element={<EditProductForm />} />
            <Route path="order" element={<FarmerOrderSection />} />
            <Route path="order/update" element={<UpdateOrderComponent />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes allowableRoles="CONSUMER" />}>
          <Route path="/consumer" element={<ConsumerHomeLayout />}>
            <Route index element={<ConsumerHome />} />
            <Route path="cart" element={<ConsumerCartSection />} />
            <Route path="order" element={<ConsumerOrderSection />} />
            <Route path="khalti-response" element={<KhaltiResponse />} />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
