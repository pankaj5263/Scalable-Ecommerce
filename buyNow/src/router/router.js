import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ProductList from "../components/layoutComponent/ProductList/ProductList";
import Layout from "../components/layoutComponent/Layout/Layout";



  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "team",
        element: <ProductList />,
      },
    ],
  },
]);

export default router;