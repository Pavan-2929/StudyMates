import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { NavLink } from "react-router-dom";
import { IoMdBookmark } from "react-icons/io";
import { setUser } from "../redux/auth/authSlice";

const MaterialCard = ({ materialsData, fetchMaterials }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    materialURL: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [materialId, setMaterialId] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [isBookmark, setIsBookMark] = useState(false);

  const fileRef = useRef();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);

  const deleteMaterial = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/material/delete/${id}`);
      fetchMaterials();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOneMaterial = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/material/get/${id}`
      );
      setFormData(response.data);
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

  const updateMaterial = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/material/update/${id}`,
        formData
      );
      toggleModal();
      fetchMaterials();
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleBookMark = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/bookmark",
        { materialId: id },
        { withCredentials: true }
      );
      toggleBookMark();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBookMark = () => {
    setIsBookMark(!isBookmark);
  };
  console.log(currentUser);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {materialsData.map((material) => (
          <div key={material._id} className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800 truncate flex-grow max-w-[80%] ml-10">
                {material.title}
              </h3>
              <IoMdBookmark
                onClick={() => handleBookMark(material._id)}
                className={`text-3xl ${
                  currentUser &&
                  (currentUser.bookMark.includes(material._id) || isBookmark)
                    ? "text-blue-500"
                    : "text-gray-300"
                }`}
              />
            </div>
            <p className="text-gray-600 mb-4 truncate">
              {material.description}
            </p>
            <div className="flex justify-between items-center font-bold">
              {currentUser && currentUser.userType === "instructor" ? (
                <>
                  <div className="flex justify-between items-center w-full space-x-4 font-bold">
                    <a
                      href={material.materialURL}
                      className="bg-blue-300 text-blue-700 rounded-full py-1 px-3 mr-2 mb-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                    <div>
                      <button
                        className="bg-yellow-300 text-yellow-700 rounded-full py-1 px-3 mr-2 mb-2"
                        onClick={() => {
                          toggleModal();
                          fetchOneMaterial(material._id);
                          setMaterialId(material._id);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-300 text-red-700 rounded-full py-1 px-3 mr-2 mb-2"
                        onClick={() => deleteMaterial(material._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex mx-auto">
                  <a
                    href={material.materialURL}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-600 mb-2 md:mb-0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg md:w-[50vw] w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Update Material
              </h2>
              <span
                className="cursor-pointer text-xl p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                onClick={toggleModal}
              >
                <FaTimes />
              </span>
            </div>
            <form onSubmit={() => updateMaterial(materialId)}>
              <div className="mb-6">
                <input
                  value={formData.title}
                  onChange={handleChange}
                  id="title"
                  type="text"
                  className="w-full px-4 py-3 border rounded-md text-lg"
                  placeholder="Material Name"
                />
              </div>
              <div className="mb-6">
                <input
                  value={formData.description}
                  id="description"
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 border rounded-md text-lg"
                  placeholder="Material Description"
                />
              </div>
              <div className="mb-6">
                <div className="mb-6">
                  <NavLink
                    to={formData.materialURL}
                    id="materialURL"
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-md text-lg"
                  >
                    Check Material
                  </NavLink>
                </div>
                <div className="mb-6">
                  <div>
                    <button
                      type="button"
                      onClick={() => fileRef.current.click()}
                      className="w-full bg-red-500 py-2 px-4 rounded-md text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Upload PDF File
                    </button>
                    <div className="mt-5 text-[1.2rem]">
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
                              className="text-red-500 hover:text-red-700 font-semibold"
                            >
                              Check new Material
                            </a>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileRef}
                    id="materialURL"
                    hidden
                    onChange={handleImageChange}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-lg transition duration-300 mr-2"
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

export default MaterialCard;
