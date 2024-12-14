import React, { useEffect, useState } from "react";
import { request } from "../api";
import { useSelector } from "react-redux";

const ProductCreate = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    request
      .get("/product-category/get")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);

    product.price = parseFloat(product.price);
    product.categoryId = parseInt(product.categoryId, 10);
    product.stock = parseInt(product.stock, 10);
    product.average_rating = 0;

    request
      .post("/product/create", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setError("");
        e.target.reset();
        alert("Product created successfully!");
      })
      .catch((err) =>
        setError(err.response?.data?.message || "Something went wrong")
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 pt-24">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create Product
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6">
          <InputField
            label="Product Name"
            name="name"
            type="text"
            placeholder="Enter product name"
            required
          />

          <TextAreaField
            label="Description"
            name="description"
            placeholder="Enter product description"
            required
          />

          <InputField
            label="Price"
            name="price"
            type="number"
            placeholder="Enter product price"
            min="0"
            step="0.01"
            required
          />

          <InputField
            label="Image URL"
            name="image"
            type="text"
            placeholder="Enter image URL"
            required
          />

          <InputField
            label="Stock"
            name="stock"
            type="number"
            placeholder="Enter stock quantity"
            min="0"
            step="1"
            required
          />

          <div>
            <label className="block mb-2 text-gray-600 font-medium">
              Category
            </label>
            <select
              name="categoryId"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading categories...</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block mb-2 text-gray-600 font-medium">{label}</label>
    <input
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      {...props}
    />
  </div>
);

const TextAreaField = ({ label, ...props }) => (
  <div>
    <label className="block mb-2 text-gray-600 font-medium">{label}</label>
    <textarea
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      {...props}
    />
  </div>
);

export default ProductCreate;
