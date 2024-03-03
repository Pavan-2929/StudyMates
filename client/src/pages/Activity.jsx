import React, { useEffect, useState } from "react";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";

const Activity = () => {
  const [allActivity, setAllActivity] = useState([]);

  const fetchAllActivity = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/activity/get"
      );
      setAllActivity(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllActivity();
  }, []);

  console.log(allActivity);

  return (
    <div className="container mx-auto px-4 mt-7">
      <h1 className="text-3xl activityTitle font-bold mb-8 text-center">
        All Activities regarding college
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allActivity.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default Activity;
