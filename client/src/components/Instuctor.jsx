import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaSadCry, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

// {
// 	teacher: "john doe",
// 	about:
// 	  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, quidem voluptas saepe ipsa recusandae repudiandae porro consequuntur mollitia magni voluptates ullam repellat cum debitis autem!",
// 	type: "maths teacher",
//   },

const Instuctor = ({ item, toggleModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: item.email,
    subject: "",
    body: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/sendmail",

        formData,

        { withCredentials: true }
      );
      setShowModal(false)
      setIsLoading(true);

      if (response) {
        console.log(response);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    !isLoading && (
      <div className=" left-0 p-5 rounded-lg   min-w-[300px] min-h-[270px] bg-richblack-700 ">
        <div>
          <h1 className=" text-xl mb-4">
            <FaQuoteLeft />
          </h1>
          <h1 className=" text-2xl mb-2 ">{item.username}</h1>
          <p className=" text-richblack-200 ">
            Submit your doubt by filling below form
          </p>
          <p className=" text-richblack-200">{item.userType}</p>
          <Link onClick={() => setShowModal(true)} className=" mt-1  underline">
            Ask doubt personally
          </Link>
        </div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="bg-richblack-700 p-6 md:p-10 rounded-lg shadow-lg md:w-[50vw] w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-center ">
                  Ask doubt
                </h2>
                <span
                  className="cursor-pointer text-xl p-2 rounded-md text-slate-900 hover:bg-red-600"
                  onClick={toggleModal}
                >
                  <FaTimes />
                </span>
              </div>
              <form className="text-richblack-900" onSubmit={submitHandler}>
                <div className="mb-6 ">
                  <input
                    value={formData.title}
                    onChange={handleChange}
                    id="subject"
                    type="text"
                    className="w-full px-4 py-3 border rounded-md text-lg"
                    placeholder="Doubt Titile"
                  />
                </div>
                <div className="mb-6">
                  <input
                    value={formData.body}
                    id="body"
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-3 border rounded-md text-lg"
                    placeholder="Brief description about doubt"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-yellow-25 hover:bg-blue-600 text-richblack-900 px-4 py-2 rounded-md text-lg transition duration-300 mr-2"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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
    )
  );
};

export default Instuctor;
