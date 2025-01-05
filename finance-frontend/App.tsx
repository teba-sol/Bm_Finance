
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import LoginPage from "./components/Login";
import DashboardPage from "./components/DashboardPage";
import Theland from "./components/Theland";
import SignUp from "./components/SignUp";
import TransactionPage from "./components/TransactionPage";
import LearnMore from "./components/LearnMore";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token"); 
  return token ? children : <Navigate to="/login" replace />;
};


const Layout = () => (
  <div>
    <Outlet /> 
  </div>
);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Theland />, 
    },
    {
      path: "/signup",
      element: <SignUp />, 
    },
    {
      path: "/learn_more",
      element: <LearnMore />, 
    },
    {
      path: "/login",
      element: <LoginPage />, 
    },
    { path: "/transaction", element: <TransactionPage /> },

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;

