import React from "react";

const Products = ({ data, isAdmin }) => {
  return (
    <div className="container mx-auto px-4 py-10 bg-gradient-to-r from-blue-50 to-blue-100 pt-24">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-600">
        Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition-transform duration-300 hover:shadow-2xl"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-lg text-green-600 font-bold mb-2">
                {product.price} USD
              </p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {product.description}
              </p>

              {isAdmin ? (
                <button
                  onClick={handleDelete}
                  className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              ) : (
                <button
                  onClick={handleAddCart}
                  className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-200"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
