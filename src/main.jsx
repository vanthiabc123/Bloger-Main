import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutMain from "./components/layout/LayoutMain.jsx";
import HomePage from "./pages/HomePage.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import AddPost from "./pages/AddPost.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import AddCategory from "./pages/AddCategory.jsx";
import DashBoardPosts from "./pages/DashBoardPosts.jsx";
import DashBoardCategory from "./pages/DashBoardCategory.jsx";
import EditPost from "./pages/EditPost.jsx";
import EditCategory from "./pages/EditCategory.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
const router = createBrowserRouter([
  {
    element: <LayoutMain></LayoutMain>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/post/:slug",
        element: <PostDetails></PostDetails>,
      },
    ],
  },
  {
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: "/admin/products/add",
        element: <AddPost></AddPost>,
      },
      {
        path: "/admin/products",
        element: <DashBoardPosts></DashBoardPosts>,
      },
      {
        path: "/editPost/:id",
        element: <EditPost />,
      },
      {
        path: "/admin/category",
        element: <DashBoardCategory></DashBoardCategory>,
      },
      {
        path: "/admin/add-category",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "/admin/edit-category/:id",
        element: <EditCategory></EditCategory>,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage></ProfilePage>,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/sign-in",
    element: <SignInPage></SignInPage>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </AuthProvider>
);
