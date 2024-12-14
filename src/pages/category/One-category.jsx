import React, { useRef, useState } from "react";
import { request } from "../../api";

const OneCategory = () => {
  const idRef = useRef(null);
  const [categoryData, setCategoryData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await request.get(
        `/product-category/get/${+idRef.current.value}`
      );
      setCategoryData(res.data);
      if (res.data.length >= 0 ) {
        alert("Bunday ID li kategoriya yo'q");
        setCategoryData(null);
        idRef.current.value = null;
      }
    } catch (error) {
      alert("Bunday ID li kategoriya yo'q");
      setCategoryData(null);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 pt-24">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Search Category by ID
        </h2>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            ref={idRef}
            type="number"
            placeholder="Enter the category ID"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </form>

        {categoryData && (
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
              {categoryData.name}
            </h3>
            <p className="text-gray-600">{categoryData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneCategory;
