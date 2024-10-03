import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Context } from "../../main";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader
import { API_FRONTEND, API_ROOT } from "../utils/constant";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false); // State for loader

  const handleNavbar = () => {
    setShow(!show);
  };
  
  const isDashboard = useLocation(`${API_FRONTEND}/dashboard`);
  
  const { mode, setMode, isAuthenticated, user, setIsAuthenticated } = useContext(Context);
  
  const navigateTo = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    try {
      const { data } = await axios.get(
        `${API_ROOT}/user/logout`,
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <section
      className={
        isDashboard.pathname === "/dashboard"
          ? "hideNavbar"
          : mode === "light"
          ? "header light-navbar"
          : "header dark-navbar"
      }
    >
      <nav>
        <div className="logo">
        Dot<span>Blog</span>
          {/* <img src={logo} alt="logo" /> */}
          
          </div>

        <div className={show ? "links show" : "links"}>
          <ul>
            <li>
              <Link to={"/"} onClick={handleNavbar}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/blogs"} onClick={handleNavbar}>
                BLOGS
              </Link>
            </li>
            <li>
              <Link to={"/authors"} onClick={handleNavbar}>
                ALL AUTHORS
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={handleNavbar}>
                ABOUT
              </Link>
            </li>
          </ul>
          <div className="btns">
            <button
              onClick={() =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
              className={
                mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
              }
            >
              {mode === "light" ? (
                <CiLight className="light-icon" />
              ) : (
                <MdDarkMode className="dark-icon" />
              )}
            </button>
            {isAuthenticated && user.role === "Author" ? (
              <Link
                to={"/dashboard"}
                onClick={handleNavbar}
                className="dashboard-btn"
              >
                DASHBOARD
              </Link>
            ) : (
              ""
            )}
            {!isAuthenticated ? (
              <Link to={"/login"} onClick={handleNavbar} className="login-btn">
                LOGIN
              </Link>
            ) : (
              <div>
                {loading ? ( // Show loader instead of the button when loading
                    <div className="loaderLoading">
                    <ClipLoader color="#4F46E5" size={40} />
                    </div>
                ) : (
                  <button className="logout-btn" onClick={handleLogout}>
                    LOGOUT
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <RxHamburgerMenu className="hamburger" onClick={handleNavbar} />
      </nav>
    </section>
  );
};

export default Navbar;
