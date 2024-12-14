import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Home from "../pages/home/Home";
import Login from "../pages/register/Login";
import Register from "../pages/register/Register";
import Admin from "../pages/admin/Admin";
import Auth from "../pages/auth/Auth";
import Category from "../pages/category/Category";
import AllCategories from "../pages/category/AllCategories";
import OneCategory from "../pages/category/One-category";
import CreateProduct from "@/pages/admin/create-product/CreateProduct";
import MenageProduct from "@/pages/admin/menage-product/MenageProduct";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-category" element={<Category />} />
        <Route path="/see-category" element={<AllCategories />} />
        <Route path="/see-one-category" element={<OneCategory />} />
      </Route>
      <Route path="/" element={<Auth />}>
        <Route path="/admin" element={<Admin />}>
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="menage-product" element={<MenageProduct />} />
          <Route path="category" element={<Category />} />
          <Route path="all-category" element={<AllCategories />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
