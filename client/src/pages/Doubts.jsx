import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const Doubts = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [doubtData, setDoubtData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchDoubtsData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/doubt/get");
      setDoubtData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchDoubtsData();
  }, []);

  const createNewDoubt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/doubt/create",
        formData,
        { withCredentials: true }
      );
      fetchDoubtsData();

      console.log(response);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoubt = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/doubt/delete/${id}`,
        { withCredentials: true }
      );
      console.log(response);
      fetchDoubtsData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto md:px-14 mb-10">
      <h1 className="text-3xl font-bold mb-4 text-center my-6">Doubts</h1>
      <div className="flex justify-center my-6">
        <button
          onClick={toggleModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg transition duration-300"
        >
          Add Doubt
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doubtData.map((doubt, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={doubt.image}
              alt={doubt.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">{doubt.title}</h2>
              <p className="text-gray-600 mb-4">{doubt.description}</p>
              <NavLink
                to={`/doubts/${doubt._id}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-5"
              >
                Explore
              </NavLink>
              {currentUser && currentUser._id === doubt.userId && (
                <button
                  onClick={() => deleteDoubt(doubt._id)}
                  className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-200 p-6 md:p-10 rounded-lg shadow-lg md:w-[50vw] w-full">
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
              <form onSubmit={createNewDoubt}>
                <div className="mb-6">
                  <input
                    value={formData.title}
                    onChange={handleChange}
                    id="title"
                    type="text"
                    className="w-full px-4 py-3 border rounded-md text-lg"
                    placeholder="Doubt Titile"
                  />
                </div>
                <div className="mb-6">
                  <input
                    value={formData.description}
                    id="description"
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-3 border rounded-md text-lg"
                    placeholder="Brief description about doubt"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-lg transition duration-300 mr-2"
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
    </div>
  );
};

export default Doubts;
