import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comments = ({ comment, fetchComments }) => {
  const [commentUser, setCommentUser] = useState({});
  const currentUser = useSelector((state) => state.currentUser);

  const fetchCommentUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/get/${comment.userId}`
      );
      setCommentUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/comment/delete/${id}`
      );
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCommentUser();
  }, [comment]);

  return (
    <div className="flex items-start mb-4 border-b-2 pb-3">
      <img
        src={commentUser.profilePicture}
        alt={commentUser.username}
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="flex flex-col">
        <p className="text-gray-800 font-semibold">{commentUser.username}</p>
        <p className="text-gray-600">{comment.content}</p>
      </div>
      {currentUser && currentUser._id === comment.userId && (
        <button
          onClick={() => deleteComment(comment._id)}
          className="ml-auto my-auto mr-5 text-red-600 hover:text-red-700 text-[1.2rem]"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default Comments;
