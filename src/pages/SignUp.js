import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();
      console.log("User created successfully:", data);

      navigate(`/createKahoot`, { state: { userId: data.id, username: data.username } });
    } catch (error) {
      console.error("Error creating user:", error);
      setApiError("Failed to create user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#46178f]">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#333]">
          Join the Fun!
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Choose a cool username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full text-xl py-3 px-4 rounded-md border-2 border-[#46178f] focus:border-[#46178f] focus:ring focus:ring-[#46178f] focus:ring-opacity-50"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 mt-1">{formik.errors.username}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full text-xl py-3 px-4 rounded-md border-2 border-[#46178f] focus:border-[#46178f] focus:ring focus:ring-[#46178f] focus:ring-opacity-50"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 text-2xl font-bold text-white bg-[#26890c] hover:bg-[#1e6c0a] focus:outline-none focus:ring-2 focus:ring-[#26890c] focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up!'}
          </button>
        </form>
        {apiError && (
          <div className="mt-4 text-red-500 text-center">{apiError}</div>
        )}
        <p className="mt-6 text-center text-[#333]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#46178f] hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}