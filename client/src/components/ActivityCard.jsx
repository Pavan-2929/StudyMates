import React from "react";
import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ActivityCard = ({ activity, fetchAllActivity }) => {
  const startingDate = new Date(activity.startingDate);
  const lastDate = new Date(activity.lastDate);
  const currentUser = useSelector((state) => state.currentUser);

  const startingDateFormat = startingDate.toLocaleDateString();
  const lastDateFormat = lastDate.toLocaleDateString();

  const deleteActivity = async (id) => {
    try {
      const response = await axios.delete(
        `https://studymates-server.onrender.com/api/activity/delete/${id}`
      );

      console.log(response);
      toast.success("Activity deleted Successfully", {
        style: {
          borderRadius: "10px",
          background: "#4CAF50",
          color: "#fff",
        },
      });
      fetchAllActivity();
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

  return (
    <div className="bg-blue activitybox rounded-lg overflow-hidden shadow-lg ">
      <div className="p-6">
        <h1 className="text-3xl font-semibold heading text-gray-800 mb-4">
          {activity.title}
        </h1>
        <p className="text-gray-600 mb-6">{activity.description}</p>
        <div className="flex items-center mb-4 text-gray-600">
          <IoLocation className="mr-2" />
          <p className="text-sm">{activity.location}</p>
        </div>
        <div className="mb-4 text-gray-600">
          <p className="mr-2 text-sm">
            Organizer Name: {activity.organizationName}
          </p>
          <p className="text-sm">
            Organizer Name: {activity.organizationEmail}
          </p>
        </div>
        <div className="flex justify-between text-gray-600 mb-4">
          <p className="text-sm">Start Date: {startingDateFormat}</p>
          <p className="text-sm">End Date: {lastDateFormat}</p>
        </div>
      </div>
      <div className="mb-5   text-white flex justify-center w-full ">
        <Link
          to={`/activity/${activity._id}`}
          className="font-semibold uppercase tracking-wide focus:outline-none transition duration-300 ease-in-out mr-4 p-2  bg-yellow-300 rounded-md hover:bg-yellow-400"
        >
          Explore
        </Link>
        {currentUser && currentUser.userType === "instructor" && (
          <button
            onClick={() => deleteActivity(activity._id)}
            className="font-semibold uppercase tracking-wide focus:outline-none transition duration-300 ease-in-out p-2 bg-[#c12b2b] rounded-md hover:bg-[#e04343]"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
