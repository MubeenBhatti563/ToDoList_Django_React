import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
                <b>User</b>
              </span>
            </li>
          </ul>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
