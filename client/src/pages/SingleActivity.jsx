import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoLocation, IoPerson } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const SingleActivity = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const currentUser = useSelector((state) => state.currentUser);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    userId: currentUser._id,
    participantsName: currentUser.username,
    participantsEmail: currentUser.email,
    activityId: id,
  });
  const [allParticipants, setAllParticipants] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  const getActivity = async () => {
    try {
      const response = await axios.get(
        `https://studymates-server.onrender.com/api/activity/get/${id}`
      );
      setActivity(response.data);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  const createParticipant = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://studymates-server.onrender.com/api/participant/create",
        formData,
        { withCredentials: true }
      );
      toast.success("You are registered", {
        style: {
          borderRadius: "10px",
          background: "#4CAF50",
          color: "#fff",
        },
      });
      fetchIsRegistered();
      toggleModal();
      console.log(response);
    } catch (error) {
      console.error("Error creating participant:", error);
      toast.error("Something went wrong", {
        style: {
          borderRadius: "10px",
          background: "#F44336",
          color: "#fff",
        },
      });
    }
  };

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(
        `https://studymates-server.onrender.com/api/participant/get/${id}`
      );
      // console.log(response);
      setAllParticipants(response.data);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const fetchIsRegistered = async () => {
    try {
      const response = await axios.get(
        `https://studymates-server.onrender.com/api/participant/get/user/${currentUser._id}`
      );

      if (response.data.length > 0) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error("Error fetching registration status:", error);
    }
  };

  useEffect(() => {
    getActivity();
    fetchParticipants();
    fetchIsRegistered();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="w-full mx-auto px-4 py-8 mt-2">
      <div className="bg-gray-200 rounded p-6 border-b-2 border-white ">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {activity.title}
        </h1>
        <p className="text-gray-600 mb-4">{activity.description}</p>
        <div className="flex items-center text-gray-600 mb-4 ">
          <IoLocation className="mr-2" />
          <p>{activity.location}</p>
        </div>
        <div className="flex items-center mb-4 text-gray-600">
          <FiCalendar className="mr-2" />
          <p>Start Date: {activity.startingDate}</p>
        </div>
        <div className="flex items-center mb-4 text-gray-600">
          <FiCalendar className="mr-2" />
          <p>End Date: {activity.lastDate}</p>
        </div>
        <div className="flex items-center mb-4 text-gray-600">
          <IoPerson className="mr-2" />
          <p>
            Required Members:{" "}
            {activity.requiredMembers - allParticipants.length}
          </p>
        </div>
        <div className="flex items-center mb-4 text-gray-600">
          <IoPerson className="mr-2" />
          <p>Organizer: {activity.organizationName}</p>
        </div>
        <div className="flex items-center mb-4 text-gray-600">
          <IoPerson className="mr-2" />
          <p>Organizer Email: {activity.organizationEmail}</p>
        </div>
      </div>
      {currentUser && currentUser.userType === "student" && !isRegistered && (
        <div className="mt-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold mb-2">
            Want to Participate in this Event
          </h1>
          <button
            onClick={toggleModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Participate
          </button>
        </div>
      )}

      {isRegistered && (
        <div className="text-center text-2xl mt-5">
          <h1>You are already registered</h1>
        </div>
      )}

      {currentUser && currentUser.userType === "instructor" && (
        <div className="mt-4">
          <h1 className="text-xl font-semibold my-5">
            All Students who participated in this activity
          </h1>
          {allParticipants.map((participant, index) => (
            <div key={index} className="bg-[#122137] rounded p-3 mb-2">
              <p className="text-gray-100 font-semibold">
                Name: {participant.participantsName}
              </p>
              <p className="text-gray-600">
                Email: {participant.participantsEmail}
              </p>
            </div>
          ))}
        </div>
      )}

      {allParticipants && allParticipants.length === 0 && (
        <div className="text-center text-2xl mt-5">
          <h1>Currently no student is registered</h1>
        </div>
      )}

      {modal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#122137] p-6 md:p-10 rounded-lg shadow-lg md:w-[50vw] w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Check your credentials
              </h2>
              <span
                className="cursor-pointer text-xl p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                onClick={toggleModal}
              >
                <FaTimes />
              </span>
            </div>
            <form onSubmit={createParticipant}>
              <div className="mb-6">
                <input
                  id="title"
                  type="text"
                  className="w-full p-3  text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700 "
                  placeholder="Doubt Title"
                  value={currentUser.username}
                  readOnly
                />
              </div>
              <div className="mb-6">
                <input
                  id="description"
                  type="text"
                  className="w-full p-3 text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700 "
                  placeholder="Brief description about doubt"
                  value={currentUser.email}
                  readOnly
                />
              </div>
              <h1 className="text-lg font-semibold mb-2">
                Event Name: {activity.title}
              </h1>
              <h1 className="text-lg font-semibold mb-2">
                Are you sure you want to participate in this activity?
              </h1>
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
  );
};

export default SingleActivity;
