import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";

const SingleDoubt = () => {
  const { id } = useParams();

  const [doubtData, setDoubtData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doubtUserData, setDoubtUserData] = useState(null);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  console.log(comments);

  const getDoubt = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/doubt/get/${id}`
      );
      setDoubtData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDoubtUserInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/get/${doubtData.userId}`
      );
      setDoubtUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/comment/create",
        {
          content,
          doubtId: id,
        },
        { withCredentials: true }
      );
      fetchComments();
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/comment/get/${id}`
      );
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoubt();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (doubtData) {
      getDoubtUserInfo();
    }
  }, [doubtData]);

  return (
    <div className="container mx-auto md:px-14 py-8">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden">
          <img
            src={doubtData.image}
            alt={doubtData.title}
            className="mx-auto rounded-md mt-6 md:w-[60vw] md:h-[60vh] w-[90vw] object-cover"
          />
          <div className="p-6">
            <div className="flex items-center mb-4">
              {doubtUserData && (
                <img
                  src={doubtUserData.profilePicture}
                  alt={doubtUserData.username}
                  className="w-10 h-10 rounded-full mr-4"
                />
              )}
              <p className="text-gray-800 text-lg font-semibold">
                {doubtUserData && doubtUserData.username}
              </p>
            </div>
            <h1 className="text-3xl font-bold mb-4">{doubtData.title}</h1>
            <p className="text-gray-700 mb-4">{doubtData.description}</p>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <ul>
              {comments &&
                comments.map((comment) => (
                  <Comments key={comment._id} comment={comment} fetchComments={fetchComments}/>
                ))}
            </ul>

            <form onSubmit={createComment} className="mt-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded-md p-2"
                rows="4"
                placeholder="Add a comment..."
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleDoubt;
