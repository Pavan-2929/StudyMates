import React, { useState } from "react";
import authImage from "../assets/authImage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import GoogleAuth from "../components/GoogleAuth";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(login());
        navigate("/");
        toast.success("Logged in Successfully", {
          style: {
            borderRadius: "10px",
            background: "#4CAF50",
            color: "#fff",
          },
        });
      } else {
        toast.error("Enter valid Information", {
          style: {
            borderRadius: "10px",
            background: "#F44336",
            color: "#fff",
          },
        });
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        style: {
          borderRadius: "10px",
          background: "#F44336",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex justify-around mt-14">
      <div className="hidden lg:flex">
        <img src={authImage} alt="Register" className="w-[25rem] h-[30rem]" />
      </div>

      <form
        onSubmit={handleSubmitLogin}
        className="w-full lg:w-1/2 sm:p-14 p-6 rounded-lg mt-4 font-semibold bg-gray-200 shadow-md"
      >
        <h1 className="sm:text-5xl text-3xl font-bold mb-10 text-gray-800">
          Login with your account
        </h1>

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

        <div className="block sm:flex justify-between items-center">
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 mt-5 hover:bg-blue-700 rounded focus:outline-none mr-10"
            >
              Login Now
            </button>
            <GoogleAuth />
          </div>
          <div className="flex items-center text-[1.2rem]">
            <div className="mt-5">
              <h3 className="text-gray-600">Create an account?</h3>
            </div>
            <NavLink
              to="/register"
              className="text-blue-500 p-2 mt-5 underline rounded ml-2 focus:outline-none hover:text-blue-700"
            >
              Register
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
