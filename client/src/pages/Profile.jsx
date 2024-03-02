import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import toast from "react-hot-toast";
import { logout, setUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const currentUser = useSelector((state) => state.currentUser);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    profilePicture: currentUser?.profilePicture || "",
  });
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/update",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(setUser(formData));
        toast.success("Profile updated Successfully", {
          style: {
            borderRadius: "10px",
            background: "#48BB78",
            color: "#fff",
          },
        });
      } else {
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#F56565",
            color: "#fff",
          },
        });
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        style: {
          borderRadius: "10px",
          background: "#F56565",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const handlefileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadtask = uploadBytesResumable(storageRef, image);

    uploadtask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (image) {
      handlefileUpload(image);
    }
  }, [image]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/logout",
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(logout());
        dispatch(setUser(null));
        navigate("/login");
        toast.success("Logout Successfully", {
          style: {
            borderRadius: "10px",
            background: "#48BB78",
            color: "#fff",
          },
        });
      } else {
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#F56565",
            color: "#fff",
          },
        });
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      toast.error(`${error}`, {
        style: {
          borderRadius: "10px",
          background: "#F56565",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/auth/delete",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/login");
        dispatch(logout());
        toast.success("User deleted Successfully", {
          style: {
            borderRadius: "10px",
            background: "#48BB78",
            color: "#fff",
          },
        });
      } else {
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#F56565",
            color: "#fff",
          },
        });
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      toast.error(`${error}`, {
        style: {
          borderRadius: "10px",
          background: "#F56565",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 p-6 rounded-lg font-semibold bg-gray-200"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Your Profile
        </h1>

        <div className="flex justify-center items-center mb-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture}
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
          <p className="ml-2">
            {imageError ? (
              <span className="text-red-700">
                Error Uploading Image (Image should be less than 2 MB)
              </span>
            ) : imagePercentage > 0 && imagePercentage < 100 ? (
              <span className="text-yellow-500">{`Uploading ${imagePercentage}%`}</span>
            ) : imagePercentage === 100 ? (
              <span className="text-green-500">Image uploaded</span>
            ) : (
              ""
            )}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-black focus:outline-none focus:border-blue-500 rounded-sm bg-gray-50 disabled:opacity-60"
            disabled
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-gray-800 focus:outline-none focus:border-blue-500 rounded-sm"
          />
        </div>

        <div className="mb-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 mt-5 hover:bg-blue-600 rounded"
          >
            Update Profile
          </button>
        </div>
        <div className="flex justify-between mt-4 text-[1.2rem]">
          <div
            className="cursor-pointer underline text-yellow-500"
            onClick={handleLogout}
          >
            Signout
          </div>
          <div
            className="cursor-pointer underline text-red-500"
            onClick={handleDeleteUser}
          >
            Delete Account
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
