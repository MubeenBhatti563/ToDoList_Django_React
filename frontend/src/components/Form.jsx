import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Form = ({ route, type }) => {
  const name = type === "login" ? "Login" : "Register";
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload =
        type === "login"
          ? { username, password }
          : { username, password, email };
      const res = await api.post(route, payload);
      if (type === "login") {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        navigate("/");
      } else {
        alert("Account created! Please login");
        navigate("/login");
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.username || err.message || "An error occurred";
      alert(`Invalid credentials ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="container-sm mt-5 border p-4 rounded"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4">{name}</h2>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {type === "register" && (
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Email adress
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput3" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlInput3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          {loading ? "Processing..." : name}
        </button>
        {type === "register" ? (
          <Link to="/login">Already have an account?</Link>
        ) : (
          <Link to="/register">Don't have account?</Link>
        )}
      </div>
    </form>
  );
};

export default Form;
