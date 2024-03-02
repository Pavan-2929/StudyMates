import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const MaterialCard = ({ materialsData, fetchMaterials }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    materialURL: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [materialId, setMaterialId] = useState(null);

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

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {materialsData.map((material) => (
          <div key={material._id} className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {material.title}
            </h3>
            <p className="text-gray-600 mb-4">{material.description}</p>
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
                <input
                  value={formData.materialURL}
                  id="materialURL"
                  onChange={handleChange}
                  type="text"
                  className="w-full px-4 py-3 border rounded-md text-lg"
                  placeholder="Material Link"
                />
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
