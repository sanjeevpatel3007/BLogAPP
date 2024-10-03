
import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Blogs from "./components/pages/Blogs";
import SingleBlog from "./components/pages/SingleBlog";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import AllAuthors from "./components/pages/AllAuthors";
import { Context } from "./main";
import axios from "axios";
import UpdateBlog from "./components/pages/UpdateBlog";
import { API_ROOT } from "./components/utils/constant.js";

const App = () => {
  const { setUser, isAuthenticated, setIsAuthenticated, setBlogs } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${API_ROOT}/user/myprofile`, {
          withCredentials: true,
        });
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("User is not authenticated:", error);
        setIsAuthenticated(false);
        setUser({});
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${API_ROOT}/blog/all`, {
          withCredentials: true,
        });
        setBlogs(data.allBlogs);
      } catch (error) {
        setBlogs([]);
      }
    };

    // Fetch user if not authenticated
    if (!isAuthenticated) {
      fetchUser();
    }

    // Always fetch blogs
    fetchBlogs();
  }, [isAuthenticated, setUser, setIsAuthenticated, setBlogs]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/authors" element={<AllAuthors />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;




