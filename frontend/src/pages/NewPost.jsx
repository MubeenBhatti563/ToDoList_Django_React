import React from "react";

const NewPost = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("working");
  };
  return (
    <form
      className="container-sm mt-5 border p-4 rounded"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );
};

export default NewPost;
