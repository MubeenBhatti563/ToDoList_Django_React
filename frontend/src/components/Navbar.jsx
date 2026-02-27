import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ setInformations }) => {
  const navigate = useNavigate();
  const isLoggin = !!localStorage.getItem("access_token");

  const token = localStorage.getItem("access_token");
  let username = "Guest";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.username || "User";
    } catch (err) {
      alert(`An error occurred ${err.message}`);
    }
  }

  const logout = () => {
    const check = confirm("Do you want to logout?");
    if (check) {
      localStorage.clear();
      // setInformations([]);
      navigate("/login");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ToDoList
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="create-post"
                className="nav-link active"
                aria-current="page"
              >
                Create post
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link active bold" aria-current="page">
                <b>{username}</b>
              </span>
            </li>
          </ul>
          {!isLoggin ? (
            <div className="d-flex gap-1">
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                aria-label="Search"
              >
                Register
              </Link>
            </div>
          ) : (
            <button className="btn btn-outline-primary" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
