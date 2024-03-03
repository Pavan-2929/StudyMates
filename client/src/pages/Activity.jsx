import React, { useEffect, useState } from "react";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";

const Activity = () => {
  const [allActivity, setAllActivity] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);
  const [showModal, setShowModal] = useState(false);

  const fetchAllActivity = async () => {
    try {
      const response = await axios.get(
        "https://studymates-server.onrender.com/api/activity/get"
      );
      setAllActivity(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllActivity();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredMembers: "",
    startingDate: "",
    lastDate: "",
    location: "",
    organizationName: "",
    organizationEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://studymates-server.onrender.com/api/activity/create",
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      // Reset form data after successful submission
      setFormData({
        title: "",
        description: "",
        requiredMembers: "",
        startingDate: "",
        lastDate: "",
        location: "",
        organizationName: "",
        organizationEmail: "",
      });

      toggleModal();

      fetchAllActivity();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formData);

  return (
    <div className="container mx-auto px-4 mt-7">
      <h1 className="text-3xl activityTitle font-bold mb-8 text-center">
        All Activities regarding college
      </h1>
      {currentUser && currentUser.userType === "instructor" && (
        <div className="flex justify-center mb-5">
          <button
            onClick={toggleModal}
            className="bg-[#212F3C] hover:bg-[#2d4052] text-white px-4 py-2 rounded-full text-lg transition duration-300"
          >
            Add new Activity
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allActivity.map((activity) => (
          <ActivityCard
            key={activity._id}
            activity={activity}
            fetchAllActivity={fetchAllActivity}
          />
        ))}
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#000819] p-6 md:p-10 rounded-lg shadow-lg md:w-[40vw] w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Enter Activity Details
              </h2>
              <span
                className="cursor-pointer text-xl p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                onClick={toggleModal}
              >
                <FaTimes />
              </span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-6">
                  <input
                    type="text"
                    className="w-full p-2 text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700"
                    placeholder="Activity Title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    className="w-full p-2 text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700"
                    placeholder="Description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="number"
                    className="w-full p-2 text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700"
                    placeholder="Required Members"
                    id="requiredMembers"
                    value={formData.requiredMembers}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="date"
                    className="w-full p-2 text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700"
                    id="startingDate"
                    value={formData.startingDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="date"
                    className="w-full p-2 text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700"
                    id="lastDate"
                    value={formData.lastDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    className="w-full p-2 text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700"
                    placeholder="Location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    className="w-full p-2 text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700"
                    placeholder="Organization Name"
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="email"
                    className="w-full p-2 text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700"
                    placeholder="Organization Email"
                    id="organizationEmail"
                    value={formData.organizationEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#e93535] hover:bg-[#f84f4f] text-white px-4 py-2 rounded-md text-lg transition duration-300 mr-2"
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

export default Activity;
