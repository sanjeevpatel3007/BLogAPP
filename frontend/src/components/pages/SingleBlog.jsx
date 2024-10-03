import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"; 
import { API_ROOT } from "../utils/constant";


const SingleBlog = () => {
  const { mode, user, isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const { data } = await axios.get(
          `${API_ROOT}/blog/singleblog/${id}`,
          { withCredentials: true }
        );
        setBlog(data.blog);
      } catch (error) {
        setBlog({});
        console.log(error);
      }
    };
    getSingleBlog();
  }, []);

  if (!isAuthenticated ) {
    toast.error("Please log in to fully read the blog."); // Show toast notification
    return <Navigate to="/" />;  // Redirect to home
  }

  return (
    <article
      className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}
    >
      {blog && (
        <section className="container">
          <div className="category">{blog.category}</div>
          <h1>{blog.title}</h1>
          <p>{`Created at: ${new Date(blog.createdAt).toLocaleString()}`}</p>          <div className="writer_section">
            <div className="author">
              <img src={blog.authorAvatar} alt="author_avatar" />
              <p>{blog.authorName}</p>
            </div>
          </div>
          {blog && blog.mainImage && (
            <img
              src={blog.mainImage.url}
              alt="mainBlogImg"
              className="mainImg"
            />
          )}
          <p className="intro-text">{blog.intro}</p>
          <div className="sub-para">
            <h3>{blog.paraOneTitle}</h3>
            {blog && blog.paraOneImage && (
              <img src={blog.paraOneImage.url} alt="paraOneImg" />
            )}
            <p>{blog.paraOneDescription}</p>
          </div>
          <div className="sub-para">
            <h3>{blog.paraTwoTitle}</h3>
            {blog && blog.paraTwoImage && (
              <img src={blog.paraTwoImage.url} alt="paraOneImg" />
            )}
            <p>{blog.paraThreeDescription}</p>
          </div>
          <div className="sub-para">
            <h3>{blog.paraThreeTitle}</h3>
            <p>{blog.paraThreeDescription}</p>
            {blog && blog.paraThreeImage && (
              <img src={blog.paraThreeImage.url} alt="paraOneImg" />
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default SingleBlog;
