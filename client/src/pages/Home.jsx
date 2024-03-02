import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { NavLink } from "react-router-dom";
import MaterialCard from "../components/MaterialCard";
import { FaTimes } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [materialsData, setMaterialData] = useState([]);

  const getUserData = async () => {
    try {
      const user = await axios.get("http://localhost:3000/api/user", {
        withCredentials: true,
      });
      dispatch(setUser(user.data));
      setUserData(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const addMaterial = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/material/create",
        formData
      );

      console.log(response);
      fetchMaterials();
      setShowModal(!showModal);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/material/get"
      );

      setMaterialData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
    fetchMaterials();
  }, []);

  return (
    <div className="container mx-auto mt-5 p-4 text-center">
      {isLoggedIn ? (
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">
            Hello, {userData.username}!
          </h1>
          <h2 className="text-xl font-semibold mb-4">
            Type: {userData.userType}
          </h2>
          <p className="text-lg">
            Welcome back to our awesome platform. Explore and enjoy your time!
          </p>
        </div>
      ) : (
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">
            Welcome to Our Platform
          </h1>
          <p className="text-lg">
            Sign in or register to access exclusive features and content.
          </p>
          <div className="mt-8 flex justify-center">
            <NavLink
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-lg mr-4 transition duration-300"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-lg transition duration-300"
            >
              Register
            </NavLink>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-200 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold pt-4 my-2">
          Find the Material for Your Curriculum
        </h1>
        {currentUser && currentUser.userType === "instructor" && (
          <div>
            <button
              onClick={toggleModal}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-md m-4 transition duration-300"
            >
              Add Material
            </button>
          </div>
        )}
        {materialsData && (
          <MaterialCard
            materialsData={materialsData}
            fetchMaterials={fetchMaterials}
          />
        )}
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75">
          <div className="bg-gray-200 md:p-10 p-4 rounded-lg shadow-lg md:w-[50vw] w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Add new Material
              </h2>
              <span
                className="cursor-pointer text-xl p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                onClick={toggleModal}
              >
                <FaTimes />
              </span>
            </div>
            <form onSubmit={addMaterial}>
              <div className="mb-6">
                <input
                  onChange={handleChange}
                  id="title"
                  type="text"
                  className="w-full px-4 py-3 border rounded-md text-lg"
                  placeholder="Material Name"
                />
              </div>
              <div className="mb-6">
                <input
                  id="description"
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 border rounded-md text-lg"
                  placeholder="Material Description"
                />
              </div>
              <div className="mb-6">
                <input
                  id="materialURL"
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 border rounded-md text-lg"
                  placeholder="Material Link"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg transition duration-300"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-lg transition duration-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
