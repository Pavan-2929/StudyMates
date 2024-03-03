import React from "react";
import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const startingDate = new Date(activity.startingDate);
  const lastDate = new Date(activity.lastDate);

  const startingDateFormat = startingDate.toLocaleDateString();
  const lastDateFormat = lastDate.toLocaleDateString();

  return (
    <div className="bg-richblack-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
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
      <div className="mb-5">
        <Link
          to={`/activity/${activity._id}`}
          className="px-4 py-3 block w-full text-white font-semibold uppercase tracking-wide focus:outline-none bg-blue-500 focus:bg-blue-600 hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
