import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "../../api";
const initialState = { name: "", description: "" };
const Category = () => {
  const paramsId = new URLSearchParams(useLocation().search).get("q");
  const [categoryData, setCategoryData] = useState(initialState);
  const token = useSelector((s) => s.token.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramsId) {
      const fetchCategories = async () => {
        try {
          const res = await request.get(`/product-category/get/${paramsId}`);
          setCategoryData(res.data);
        } catch (err) {
          alert("Xatolik kategoriyani ko'rishda");
        }
      };
      fetchCategories();
    }
  }, [paramsId]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await request.patch(
        `/product-category/update/${paramsId}`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategoryData(initialState);
      alert("You successfully updated category");
      navigate("/see-category");
    } catch {
      alert("Xatolik categoryni update qilishda");
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!token) {
      return alert("You need to login otherwise you cannot create a category");
    }
    try {
      await request.post("/product-category/create", categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategoryData(initialState);
      alert("You successfully created category");
      navigate("/see-category");
    } catch (err) {
      alert(err.response.data?.message.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 pt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          {paramsId ? "Edit Category" : "Create Category"}
        </h2>

        <form
          onSubmit={paramsId ? handleUpdateCategory : handleCreateCategory}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block mb-2 text-gray-600">Category Name</label>
            <input
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData({ ...categoryData, name: e.target.value })
              }
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-600">Description</label>
            <input
              value={categoryData.description}
              onChange={(e) =>
                setCategoryData({
                  ...categoryData,
                  description: e.target.value,
                })
              }
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter category description"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
          >
            {paramsId ? "Update Category" : "Create Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Category;
