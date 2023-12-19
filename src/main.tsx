import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import All from "./routes/All/All.tsx";
import Login from "./routes/Auth/Login.tsx";
import Category from "./routes/Category/Category.tsx";
import Home from "./routes/Home/Home.tsx";
import Root from "./routes/Root/Root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "category/:categoryName",
        element: <Category />,
      },
      {
        path: "*",
        element: <All />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
