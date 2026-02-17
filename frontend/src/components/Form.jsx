import React from "react";
import { Link } from "react-router-dom";

const Form = ({ route, type }) => {
  const name = type === "login" ? "Login" : "Register";

  return (
    <div className="container-sm mt-5 border p-4 rounded">
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary">
          {name}
        </button>
        {type === "register" ? (
          <Link to="/login">Already have an account?</Link>
        ) : (
          <Link to="/register">Don't have account?</Link>
        )}
      </div>
    </div>
  );
};

export default Form;
