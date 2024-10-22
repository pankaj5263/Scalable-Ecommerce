import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layoutComponent/Layout/Layout";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"product-details/:productId",
        element: <ProductDetails />,
      },
      {
        path:"add-product",
        element: <AddProduct />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
