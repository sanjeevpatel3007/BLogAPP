import React, { useContext } from "react";
import { Context } from "../../main";

const About = () => {
  const { mode } = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <h2>About</h2>
        <h3>Welcome to DotBlog!
        </h3>
        <p>
          DotBlog is a platform where thoughts are transformed into meaningful conversations.
          Whether you’re a seasoned writer or just someone with an idea to share, DotBlog offers
          a simple yet powerful space to express yourself and connect with like-minded individuals.

          Our mission is to create a community-driven platform where every voice can be heard. We believe
          that blogging is not just about writing but about exchanging perspectives, exploring new ideas,
          and building connections. Whether you're sharing personal experiences, professional insights, or
          creative ideas, DotBlog is the place to let your voice shine.


        </p>
        <h3>Why Choose DotBlog?
        </h3>
        <p>
<h4>          <b>User-Friendly:</b>
</h4>
          We've built DotBlog to be intuitive and easy to use, so you can focus on what matters most — your content.
          With simple tools to customize your blog, you can express yourself effortlessly.
        </p>
        <p>
      
      <h4>

      <b>Engage and Connect:</b>

      </h4>

          Our platform encourages meaningful interactions between readers and writers.
          Comment, share, and start discussions on topics that matter to you. DotBlog helps you build your own community of
          followers and like-minded individuals.
        </p>


        <p>
          <h4>
            <b>Accessible for All:</b>
          </h4>
          DotBlog is for everyone, from first-time bloggers to experienced writers.
          Whether you’re writing to document your journey, build an audience, or just share your passion,
          DotBlog gives you the platform to do so.
        </p>
        <p>
        Our mission is to create a community-driven platform that fosters exchange of 
        perspectives, creativity, and connection. With customizable tools, you can easily share
         personal stories, professional insights, or creative ideas. DotBlog encourages engagement
          through comments, shares, and discussions, helping you build a like-minded community.
           Accessible to everyone, DotBlog is the 
        place to inspire, engage, and make an impact—one blog at a time. Join us today!
        </p>

        <div>
          <p>

            Join DotBlog today and start sharing your story. Let’s inspire, engage, and make an impact — one blog at a time.
          </p>
        </div>



      </div>
    </article>
  );
};

export default About;
