import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AuthorizeCheck from "../components/AuthorizeCheck";

import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import CarManagement from "../screens/CarManagement";
import NotFoundScreen from "../screens/NotFoundScreen";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
        // redirecting root to the login page
        { path: "/", element: <Navigate to="/login" replace /> },

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

        // 404 inside layout
        { path: "*", element: <NotFoundScreen /> },
    ],
  },
  // routes without layout
  { path: "/login", element: <Login /> },
  // global 404
  { path: "*", element: <NotFoundScreen /> },
]);

export default router;
