import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { NavLink } from "react-router-dom";
import MaterialCard from "../components/MaterialCard";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({});
  const [materialsData, setMaterialData] = useState([]);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileError, setFileError] = useState(false);

  const fileRef = useRef(null);

  const getUserData = async () => {
    try {
      const user = await axios.get(
        "https://studymates-server.onrender.com/api/user",
        {
          withCredentials: true,
        }
      );
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
        "https://studymates-server.onrender.com/api/material/create",
        formData
      );
      toast.success("Material Added Successfully", {
        style: {
          borderRadius: "10px",
          background: "#4CAF50",
          color: "#fff",
        },
      });
      console.log(response);
      fetchMaterials();
      setShowModal(!showModal);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        style: {
          borderRadius: "10px",
          background: "#F44336",
          color: "#fff",
        },
      });
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        "https://studymates-server.onrender.com/api/material/get"
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

  const handleImageChange = (e) => {
    try {
      const imageFile = e.target.files[0];
      if (!imageFile) return;

      const handlefileUpload = async (image) => {
        const storage = getStorage();
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);

        const uploadtask = uploadBytesResumable(storageRef, image);

        uploadtask.on(
          "state_changed",
          (snapShot) => {
            const progress =
              (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
            setFilePercentage(Math.round(progress));
          },
          (error) => {
            setFileError(true);
            console.log(error);
          },
          () => {
            getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) =>
              setFormData({ ...formData, materialURL: downloadURL })
            );
          }
        );
      };

      handlefileUpload(imageFile);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData);

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
          <p className="text-lg text-white">
            Welcome back to our awesome platform. Explore and enjoy your time!
          </p>
        </div>
      ) : (
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg heading">
          <h1 className="text-3xl font-semibold mb-4">
            Welcome to <span className="platform">StudyMates</span>
          </h1>

          <p className="text-lg text-white">
            Sign in or register to access exclusive features and content.
          </p>
          <div className="mt-8 flex justify-center">
            <NavLink
              to="/login"
              className="bg-yellow-400 hover:bg-yellow-300 box3 text-black px-4 py-2 rounded-full text-lg mr-4 transition duration-300"
            >
              <b className="text-black">Login</b>
            </NavLink>
            <NavLink
              to="/register"
              className="bg-[#212F3C] hover:bg-[#2d4052] box2 text-white px-4 py-2 rounded-full text-lg transition duration-300"
            >
              Register
            </NavLink>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-200 rounded-lg shadow-lg heading border-t-2 border-gray-500">
        <h1 className="text-2xl font-semibold pt-4 my-2">
          Find the Material for Your Curriculum
        </h1>
        {currentUser && currentUser.userType === "instructor" && (
          <div>
            <button
              onClick={toggleModal}
              className="bg-[#212F3C] hover:bg-[#2d4052] text-white px-4 py-2 rounded-full text-lg transition duration-300"
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
          <div className="bg-[#122137] md:p-10 p-4 rounded-lg shadow-lg md:w-[50vw] w-full">
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
                  className="w-full p-2  text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700 "
                  placeholder="Material Name"
                />
              </div>
              <div className="mb-6">
                <input
                  id="description"
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2  text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700 "
                  placeholder="Material Description"
                />
              </div>
              <div className="mb-6">
                <div>
                  <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="bg-yellow-300 text-yellow-700 rounded-full py-1 px-3 mr-2 mb-2"
                  >
                    <b>Upload PDF File</b>
                  </button>
                  <p className="mt-5 text-[1.2rem]">
                    {fileError ? (
                      <span className="text-red-700">
                        Error Uploading Image (Image should be less than 2 MB)
                      </span>
                    ) : filePercentage > 0 && filePercentage < 100 ? (
                      <span className="text-yellow-500">{`Uploading ${filePercentage}%`}</span>
                    ) : filePercentage === 100 ? (
                      <div className="flex justify-between items-center">
                        <span className="text-green-500">File uploaded</span>
                        <div className="ml-4">
                          <a
                            href={formData.materialURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text--500 hover:text-red-700 font-semibold"
                          >
                            Check Material
                          </a>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  onChange={handleImageChange}
                  className="w-full"
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
                  className="bg-[#212F3C] hover:bg-[#2d4052] text-white px-4 py-2 rounded-full text-lg transition duration-300"
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
