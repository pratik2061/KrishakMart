import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import ConsumerHome from "./pages/consumer/ConsumerHome";
import AdminHome from "./pages/admin/AdminHome";
import FarmerHome from "./pages/farmer/FarmerHome";
import { UnauthorizedPage } from "./components/unauthorized";
import { NotFoundPage } from "./components/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route element={<ProtectedRoutes allowableRoles="ADMIN" />}>
          <Route path="/admin">
            <Route index element={<AdminHome />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes allowableRoles="FARMER" />}>
          <Route path="/farmer">
            <Route index element={<FarmerHome />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes allowableRoles="CONSUMER" />}>
          <Route path="/consumer" element={<ConsumerHome />}>
            <Route index  />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
