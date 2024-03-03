import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/all");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white border-y-2 border-pure-greys-100 py-3">
            <tr>
              <th className="px-6 py-3 text-left font-medium uppercase text-sm">
                Profile Picture
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase text-sm">
                Username
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase text-sm">
                Email
              </th>
              <th className="px-6 py-3 text-left font-medium uppercase text-sm">
                User Type
              </th>
              <th className="px-6 py-3 text-center font-medium uppercase text-sm">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="px-6 py-4">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.profilePicture}
                    alt=""
                  />
                </td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.userType}</td>
                <td className="px-6 py-4 text-center">
                  <button className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
