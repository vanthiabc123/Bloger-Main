import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex ">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        {/* Navigation */}
        <ul className="mt-4">
          <li className="py-2">
            <a
              href="/admin/products"
              className="text-gray-400 hover:text-white"
            >
              Products
            </a>
          </li>
          <li className="py-2">
            <a
              href="/admin/category"
              className="text-gray-400 hover:text-white"
            >
              Category
            </a>
          </li>
          <li className="py-2">
            <a className="text-gray-400 hover:text-white">Logout</a>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </div>
      {/* Main content */}
      <div className="flex-1 bg-white p-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
