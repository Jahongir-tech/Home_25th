import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div id="admin" className="flex">
      <div className=" w-80 h-screen bg-slate-900 p-6 text-white sticky top-0 left-0">
        <Link to={"/"}>
          <p className="text-2xl font-medium">Dashboard</p>
        </Link>
        <ul className="mt-10">
          <li>
            <NavLink
              className="block p-3 rounded-md mb-2"
              to={"create-product"}
            >
              <span>Create Product</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="block p-3 rounded-md mb-2"
              to={"menage-product"}
            >
              <span>Manage Product</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="block p-3 rounded-md mb-2" to={"category"}>
              <span>Create Category</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="block p-3 rounded-md mb-2" to={"all-category"}>
              <span>Menage Category</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
