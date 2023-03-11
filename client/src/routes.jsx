import App from "./App";
import Products from "./components/product/ViewProducts";
import RegistrationForm from "./components/authentication/RegistrationForm";
import LoginForm from "./components/authentication/LoginForm";
import CreateProductForm from "./components/product/CreateProductForm";
import ViewProduct from "./components/product/ViewProduct";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "register",
        element: <RegistrationForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "product/create",
        element: <CreateProductForm />,
      },
      {
        path: "product/:_id",
        element: <ViewProduct />,
      },
    ],
  },
];

export default routes;
