import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { createStandaloneToast } from "@chakra-ui/toast";
import AuthContextProvider from "./components/context/AuthContext";

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
