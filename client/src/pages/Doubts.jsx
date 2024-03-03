import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import "../index.css";
import Instuctor from "../components/Instuctor";
const Doubts = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [doubtData, setDoubtData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [allInstructors, setAllInstructors] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const example = [
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
    {
      teacher: "john doe",
      about:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem nesciunt hic et quo incidunt, ",
      type: "maths teacher",
    },
  ];

  const fetchDoubtsData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/doubt/get");
      setDoubtData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchDoubtsData();
  }, []);

  const createNewDoubt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/doubt/create",
        formData,
        { withCredentials: true }
      );
      fetchDoubtsData();

      console.log(response);
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoubt = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/doubt/delete/${id}`,
        { withCredentials: true }
      );
      console.log(response);
      fetchDoubtsData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInstructor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/get/instructor"
      );

      console.log(response);
      setAllInstructors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInstructor();
  }, []);

  return (
    <div className="container mx-auto md:px-14 mb-10">
      <div className=" flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold mb-4 text-center my-6"></h1>
        <div className="flex justify-center my-6">
          <button
            onClick={toggleModal}
            className=" bg-yellow-25 hover:bg-yellow-200  text-richblue-900 px-4 py-2 text-lg transition duration-300 flex items-center gap-3 rounded-xl h-[40px]  hover:scale-95 "
          >
            Add Questions
            <IoIosArrowDown className=" border-l border-white p-1 text-3xl" />
          </button>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col items-center justify-center ">
        <div className="sm:w-[2/3] w-full  flex flex-col items-center">
          <h1 className=" text-left text-4xl">Doubt Questions</h1>
          <div className="h-[30px]"></div>
          <p className=" w-[70%] text-slate-300 text-justify   ">
            Feel free to ask your doubt related yout Curriculum to your faculty.
          </p>
          <div className="flex flex-col mt-5  overflow-y-scroll w-full scrollbar-w-12 scrollbar-track-bg h-[90vh] scrollbar-thumb-bg">
            {doubtData.map((doubt, index) => (
              <div
                key={index}
                className=" bg-richblack-800 outline-1 outline-pure-greys-25 m-4 rounded-lg shadow-md shadow-richblack-600"
              >
                {/* <img
                  src={doubt.image}
                  alt={doubt.title}
                  className="w-full h-48 object-cover"
                /> */}

                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-2">
                    Q . {doubt.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    des : {doubt.description}
                  </p>
                  <NavLink
                    to={`/doubts/${doubt._id}`}
                    className="inline-block px-4 py-2 bg-richblack-700 text-white rounded hover:bg-richblack-600 hover:scale-95 mr-5 shadow-richblack-400 shadow-sm"
                  >
                    Explore
                  </NavLink>
                  {currentUser && currentUser._id === doubt.userId && (
                    <button
                      onClick={() => deleteDoubt(doubt._id)}
                      className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50">
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
                  <form
                    className="text-richblack-900"
                    onSubmit={createNewDoubt}
                  >
                    <div className="mb-6 ">
                      <input
                        value={formData.title}
                        onChange={handleChange}
                        id="title"
                        type="text"
                        className="w-full px-4 py-3 border rounded-md text-lg"
                        placeholder="Doubt Titile"
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        value={formData.description}
                        id="description"
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
        </div>

        <img
          src="https://thumbs.dreamstime.com/b/vertical-business-background-group-businesspeople-around-meeting-table-having-discussion-office-170709724.jpg"
          alt="img"
          className="sm:w-[1/3] h-[90vh] w-full px-5 sm:object-cover"
        />
      </div>
      <div className=" sm:h-[40vh] flex flex-col items-center justify-center my-5 ">
        {" "}
        <h1 className=" text-4xl text-center my-5">Our Faculties</h1>{" "}
        <p className=" text-richblack-100 text-center sm:w-full w-[90%] sm:mb-0 mb-4 ">
          In this faculty list, students can directly communicate with
          individual faculty members to resolve their academic
          doubts and inquiries.
        </p>
      </div>
      <div
        className="h-[50vh] w-full flex flex-row scrollbar-w-9 scrollbar-track-bg
        scrollbar-thumb-instructbg items-center pl-5  gap-5 overflow-auto overflow-x-scroll bg-richblack-800 "
      >
        {allInstructors.map((item, index) => {
          return (
            <Instuctor toggleModal={toggleModal} item={item} key={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Doubts;
