import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const NewPost = ({ setInformations }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/api/lists/", { title, content });
      if (res.status === 201) {
        setInformations((prev) => [res.data, ...prev]);
        setTitle("");
        setContent("");
        navigate("/");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
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
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
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
          onChange={(e) => setContent(e.target.value)}
          value={content}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default NewPost;
