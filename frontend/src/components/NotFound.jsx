import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="container-sm mt-4 d-flex align-items-center justify-content-center"
      style={{ height: "70vh", width: "500px", maxWidth: "90%" }}
    >
      <div className="card py-4" style={{ width: "100%" }}>
        <div className="card-body d-flex gap-2 flex-column align-items-center">
          <h2 className="card-title text-danger">Page Not Found 404</h2>
          <p className="card-text">
            Page that you're looking for doesn't exist!
          </p>
          <Link to="/" className="card-link">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
