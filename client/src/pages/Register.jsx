import React, { useState } from "react";
import authImage from "../assets/authImage.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

const handleChange = (e) => {
  if (e.target.type === "radio") {
    setFormData({ ...formData, userType: e.target.value });
  } else {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
};


  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(login());
        navigate("/");
        toast.success("Registration Successful", {
          style: {
            borderRadius: "10px",
            background: "#10B981",
            color: "#ffffff",
          },
        });
      } else {
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#EF4444",
            color: "#ffffff",
          },
        });
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(`${error.response.data.message}`, {
        style: {
          borderRadius: "10px",
          background: "#EF4444",
          color: "#ffffff",
        },
      });
    }
  };

  return (
    <div className="flex justify-around items-center mt-6">
      <div className="hidden lg:flex">
        <img
          src={authImage}
          alt="Register"
          className="w-[25rem] h-[30rem] object-cover rounded-lg"
        />
      </div>

      <form
        onSubmit={handleSubmitRegister}
        className="w-full lg:w-1/2 sm:p-8 p-4 rounded-lg mt-4 font-semibold bg-gray-100"
      >
        <h1 className="sm:text-5xl text-3xl font-bold mb-6 text-gray-800 text-center">
          Register with your account
        </h1>

        <div className="mb-4">
          <label htmlFor="username" className="text-gray-800">
            Username
          </label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-gray-800">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-gray-800">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
          />
        </div>
        <div>
          <label className="text-gray-800 block mb-2">User Type:</label>
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <input
                type="radio"
                id="instructor"
                name="userType"
                value="instructor"
                onChange={handleChange}
                className="mr-2 cursor-pointer"
              />
              <label
                htmlFor="instructor"
                className="text-gray-800 cursor-pointer"
              >
                Instructor
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="student"
                name="userType"
                value="student"
                onChange={handleChange}
                className="mr-2 cursor-pointer"
              />
              <label htmlFor="student" className="text-gray-800 cursor-pointer">
                Student
              </label>
            </div>
          </div>
        </div>

        <div className="block sm:flex justify-between items-center">
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 mt-2 hover:bg-blue-700 rounded focus:outline-none mr-10"
            >
              Register Now
            </button>
            <GoogleAuth />
          </div>
          <div className="flex items-center text-[1.2rem]">
            <div className="mt-5">
              <h3 className="text-gray-800">Have an account?</h3>
            </div>
            <NavLink
              to="/login"
              className="text-blue-500 p-2 mt-2 underline rounded ml-2 focus:outline-none"
            >
              Login
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
