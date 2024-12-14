import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/wishlist-slice";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.value);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
        Your Wishlist
      </h2>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-green-600 font-bold text-md mb-4">
                  ${item.price}
                </p>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          Your wishlist is empty. Start adding your favorite products!
        </p>
      )}
    </div>
  );
};

export default Wishlist;
