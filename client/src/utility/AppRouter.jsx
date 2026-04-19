import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { LayoutProvider } from "../layout/context/LayoutContext";
import AuthorizeCheck from "../components/AuthorizeCheck";
import PublicAppLayout from "../layout/PublicAppLayout";
import Login from "../screens/Login/Login";
import Dashboard from "../screens/Dashboard/Dashboard";
import CarManagement from "../screens/CarManagement/CarManagement";
import NotFoundScreen from "../screens/NotFound/NotFoundScreen";

const router = createBrowserRouter([
  {
    // do not want to render the navbars, but do want the footer on the login page.
    element: <PublicAppLayout />,
    children: [
      // redirecting root to the login page
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <Login /> },
    ],
  },
  // authenticated routes
  {
    element: <AppLayout />,
    children: [
      { 
        path: "/dashboard", 
        element: (
          <AuthorizeCheck>
            <Dashboard/>
          </AuthorizeCheck>
        ) 
      },
      { 
        path: "/cars", 
        element: (
          <AuthorizeCheck>
            <CarManagement/>
          </AuthorizeCheck>
        ) 
      },

      // 404 inside auth layout
      { path: "*", element: <NotFoundScreen /> },
    ],
  },
  // global 404
  { path: "*", element: <NotFoundScreen /> },
]);

export default router;
