import React, { useState } from "react";
import { request } from "../../api";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/slices/token-slice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData);

    // Password match validation
    if (user.password !== user.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    request
      .post("/auth/signup-admin", user)
      .then((res) => {
        dispatch(signIn(res.data.access_token));
        e.target.reset();
        setError("");
        navigate("/admin");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 pt-24">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Register
        </h2>

        {error && (
          <div className="mb-4 p-3 text-red-600 bg-red-100 border border-red-300 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-6">
          <InputField
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
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
          <InputField
            type="password"
            name="confirm_password"
            placeholder="Confirm your password"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
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

export default Register;
