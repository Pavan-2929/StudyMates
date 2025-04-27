import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaRegistered } from "react-icons/fa";
import { IoLogInSharp } from "react-icons/io5";
import { FaBook } from "react-icons/fa";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={` p-4 font-semibold border-b-2 border-gray-500`}>
      <div className="md:flex justify-around items-center">
        <div className="text-[2rem] flex justify-around items-center relative">
          <span className=" animate-fire text-yellow-300">UniLink</span>
          <div onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <div>
          <ul
            className={`text-[1.5rem] font-semibold md:flex ${
              isMenuOpen ? "block" : "hidden"
            } space-y-8 md:space-y-0 items-center flex flex-col md:flex-row justify-center `}
          >
            <li className="md:ml-5 xl:mx-5 sm:mt-0 mt-10 hover:text-red-600">
              <NavLink to="/" onClick={closeMenu}>
                <div className="line hover:text-yellow-300 flex items-center gap-2">
                  <FaHome />
                  Home
                </div>
              </NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li className="md:ml-5 xl:mx-5 hover:text-red-600 ">
                  <NavLink to="/doubts">
                    <div className="flex items-center gap-2">
                      <FaBook />
                      Doubts
                    </div>
                  </NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-red-600">
                  <NavLink to="/activity">Activity</NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-red-600">
                  <a href="https://zoom-20pf.onrender.com" target="_blank">
                    Meeting
                  </a>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-red-600">
                  <NavLink to="/chatboat">Chatboat</NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-red-600">
                  <NavLink to="/profile" onClick={closeMenu}>
                    {currentUser && currentUser.profilePicture && (
                      <img
                        src={
                          FormData.profilePicture || currentUser.profilePicture
                        }
                        alt="Profile"
                        className="h-12 w-12 rounded-full"
                      />
                    )}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="md:ml-5 xl:mx-5 ">
                  <NavLink to="/register" onClick={closeMenu}>
                    <div className="line hover:text-yellow-300 flex items-center gap-2">
                      <FaRegistered className="text-slate-800 " />
                      Register
                    </div>
                  </NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 ">
                  <NavLink to="/login" onClick={closeMenu}>
                    <div className="line hover:text-yellow-300 flex items-center gap-2">
                      <IoLogInSharp className="text-slate-800 " />
                      Login
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
