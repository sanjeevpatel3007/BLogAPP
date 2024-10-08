import axios from "axios";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { API_ROOT } from "../utils/constant";
const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await axios.get(
        `${API_ROOT}/user/authors`,
        { withCredentials: true }
      );
      setAuthors(data.authors);
    };
    fetchAuthors();
  }, []);
  return (
    <section className="popularAuthors">
      <h3>Popular Authors</h3>
      <div className="container">
        {authors && authors.length > 0 ? (
          authors.slice(0, 4).map((element) => {
            return (
              <div className="card" key={element._id}>
                <img src={element.avatar.url} alt="author" />
                <p>{element.name}</p>
                <p>{element.role}</p>
              </div>
            );
          })
        ) : (
          <BeatLoader color="gray" size={30} />
        )}
      </div>
    </section>
  );
};

export default PopularAuthors;
