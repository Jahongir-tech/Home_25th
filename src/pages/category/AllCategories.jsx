import React, { useEffect, useState } from "react";
import { request } from "../../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllCategories = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.value);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await request.get("/product-category/get");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await request.delete(`/product-category/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories((prev) => prev.filter((category) => category.id !== id));
      alert("Category successfully deleted.");
    } catch (err) {
      console.error(err);
      alert("Error deleting category.");
    }
  };

  const handleEditCategory = (id) => navigate(`/create-category?q=${id}`);

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 pt-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600">
            All Categories
          </h1>
          <button
            onClick={() => navigate("/create-category")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md transition-all duration-200"
          >
            Add Category
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 text-xl">
            Loading categories...
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onDelete={handleDelete}
                onEdit={handleEditCategory}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-xl">
            No categories available.
          </div>
        )}
      </div>
    </section>
  );
};

const CategoryCard = ({ category, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
        <p className="text-gray-600 mt-2">{category.description}</p>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => onEdit(category.id)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AllCategories;
