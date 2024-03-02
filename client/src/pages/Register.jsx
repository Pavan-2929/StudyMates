import React, { useState } from "react";
import authImage from "../assets/authImage.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import toast from "react-hot-toast";
import { CiMail } from "react-icons/ci";
import { FiAtSign } from "react-icons/fi";
import { FaKey } from "react-icons/fa";
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
    <div className="flex justify-evenly items-center mt-6">
      <div className="hidden    lg:flex">
        <img
          src={authImage}
          alt="Register"
          className="w-[25rem] h-[30rem] object-cover rounded-lg"
        />
      </div>

      <form
        onSubmit={handleSubmitRegister}
        className="w-[90%] sm:w-1/2 h-fit lg:w-1/3 sm:p-8 p-4 rounded-lg mt-4 font-semibold bg-slate-50 shadow-lg"
      >
        <h1 className="sm:text-5xl text-3xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h1>

        <div className="mb-4 relative">
          <div className="relative flex">
            <FiAtSign className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />

            <input
              type="text"
              id="username"
              onChange={handleChange}
              placeholder="username"
              className="w-full pl-10 pr-2 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
            />
          </div>
        </div>

        {/* */}
        <div className="mb-4 relative">
          <div className="relative flex">
            <CiMail className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />

            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full pl-10 pr-2 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
            />
          </div>
        </div>

        <div className="mb-4 relative">
          <div className="relative flex">
            <FaKey className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />

            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              className="w-full pl-10 pr-2 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
            />
          </div>
        </div>

        <div className="mb-4 relative">
          <div className="relative flex">
            <FaKey className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />

            <input
              type="password"
<<<<<<< HEAD
              id="confirmpassword"
=======
              id="confirmPassword"
>>>>>>> 1129cece1aa2dd327c4b71df4169709bc01f7c3b
              placeholder="confirmpassword"
              onChange={handleChange}
              className="w-full pl-10 pr-2 py-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
            />
          </div>
        </div>
        <div className="mb-4 relative">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 mt-2 hover:bg-blue-700 rounded focus:outline-none mr-10 w-full "
          >
            Register Now
          </button>
          <GoogleAuth />
        </div>
        <div className="flex gap-3 items-center my-4">
          <div className="text-gray-800 block ">User Type:</div>
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
              <label
                htmlFor="student"
                className="text-gray-800 cursor-pointer"
              >
                Student
              </label>
            </div>
          </div>
        </div>

        <div className="block sm:flex justify-between my-5 items-center">
          <div className="flex items-center justify-between text-[1rem]">
            <h3 className="text-gray-800 ">Have an account?</h3>

            <NavLink
              to="/login"
              className="text-blue-500 underline rounded ml-2 focus:outline-none"
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
