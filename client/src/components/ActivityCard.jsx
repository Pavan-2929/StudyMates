import React from "react";
import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const startingDate = new Date(activity.startingDate);
  const lastDate = new Date(activity.lastDate);

  const startingDateFormat = startingDate.toLocaleDateString();
  const lastDateFormat = lastDate.toLocaleDateString();

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
        <div className="mb-4 text-gray-600">
          <p className="text-sm">
            Required Memberes: {activity.requiredMembers}
          </p>
        </div>
        <div className="flex justify-between text-gray-600 mb-4">
          <p className="text-sm">Start Date: {startingDateFormat}</p>
          <p className="text-sm">End Date: {lastDateFormat}</p>
        </div>
      </div>
      <div className="mb-5 explore hover:bg-[#314051] text-[#B69507] ">
        <Link
          to={`/activity/${activity._id}`}
          className="font-semibold uppercase tracking-wide 
        focus:outline-none  transition duration-300 ease-in-out"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
