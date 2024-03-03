import React, { useState } from "react";
import authImage from "../assets/authImage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import GoogleAuth from "../components/GoogleAuth";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { CiMail } from "react-icons/ci";
import { FaKey } from "react-icons/fa";
import "../index.css";

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
        "https://studymates-server.onrender.com/api/auth/login",
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
        className="w-[100%] sm:w-1/2 h-fit lg:w-1/3 sm:p-8 p-4 rounded-lg mt-4 font-semibold bg-[#122137] text-pure-greys-800 shadow-md shadow-pure-greys-100 "
      >
        <h1 className="sm:text-5xl text-center text-3xl text-white font-bold mb-10 text-gray-800">
          Login
        </h1>

        <div className="mb-4 relative">
          <div className="relative flex">
            <CiMail className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-white" />

            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full pl-10 pr-2 py-2  text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700 "
            />
          </div>
        </div>

        <div className="mb-4 relative">
          <div className="relative flex">
            <FaKey className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-pure-greys-100" />

            <input
              type="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              className="w-full pl-10 pr-2 py-2  text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700 "
            />
          </div>
        </div>
        <div className="mb-4 relative">
          <button
            type="submit"
            className=" bg-yellow-50 w-full text-pure-greys-800  p-2 mt-5 hover:scale-95 rounded focus:outline-none mr-10"
          >
            Login Now
          </button>
          <GoogleAuth />
        </div>

        <div className="block sm:flex justify-between my-5 items-center">
          <div className="flex items-center justify-between text-[1rem]">
            <h3 className="text-white">Create an account?</h3>

            <NavLink
              to="/register"
              className=" text-pure-greys-50 underline rounded ml-2 focus:outline-none"
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
