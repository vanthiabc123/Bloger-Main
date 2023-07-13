import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutMain from "./components/layout/LayoutMain.jsx";
import HomePage from "./pages/HomePage.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import AddPost from "./pages/AddPost.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
  {
    element: <LayoutMain></LayoutMain>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
    ],
  },
  {
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: "/admin/add-product",
        element: <AddPost></AddPost>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
      <ToastContainer></ToastContainer>
    </RouterProvider>
  </React.StrictMode>
);
