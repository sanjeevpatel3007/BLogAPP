import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { API_ROOT } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const { mode, isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_ROOT}/user/login`,
        { email, password, role },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      // Set user and authentication status on successful login
      setUser(res.data.user); // Assuming the user object is returned in the response
      setIsAuthenticated(true);
      toast.success(res.data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleLogin}>
          <h1>LOGIN</h1>
          <div>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">SELECT ROLE</option>
              <option value="Reader">READER</option>
              <option value="Author">AUTHOR</option>
            </select>
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p>
            Don't have any Account? <Link to="/register">Register Now</Link>
          </p>
          <div>
            {loading ? (
              <div className="loaderLoading">
                <ClipLoader color="#4F46E5" size={40} />
              </div>
            ) : (
              <button className="submit-btn" type="submit">
                LOGIN
              </button>
            )}
          </div>
        </form>
      </section>
    </article>
  );
};

export default Login;





