import React, { useState } from "react";
import { request } from "../../api";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/slices/token-slice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData);

    setLoading(true);
    setError("");

    request
      .post("/auth/signin-admin", user)
      .then((res) => {
        dispatch(signIn(res.data.access_token));
        event.target.reset();
        navigate("/create-category");
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 p-3 text-red-600 bg-red-100 border border-red-300 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-6">
          <InputField
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <InputField
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition duration-200`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ type, name, placeholder, ...props }) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      {...props}
    />
  </div>
);

export default Login;
