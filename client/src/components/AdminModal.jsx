import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminModal = ({ toggleModal }) => {
  const [passcode, setPasscode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    try {
      const Admin = "admin123";
      if (Admin === passcode) {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#000819] p-6 md:p-10 rounded-lg shadow-lg md:w-[40vw] w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Enter the passcode
          </h2>
          <span
            className="cursor-pointer text-xl p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            onClick={toggleModal}
          >
            <FaTimes />
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="passwird"
              className="w-full p-2  text-white focus:outline-none focus:border-blue-500 rounded-sm bg-richblack-700 "
              placeholder="Enter your passcode"
              onChange={(e) => setPasscode(e.target.value)}
            />
          </div>

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
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
