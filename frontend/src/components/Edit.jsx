import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";

const Edit = ({ informations, setInformations }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = informations.find((i) => i.id === Number(id));
  const [title, setTitle] = useState(item ? item.title : "");
  const [content, setContent] = useState(item ? item.content : "");

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/api/lists/${id}`, { title, content });
      if (res.status === 200) {
        const updatedList = informations.map((info) =>
          String(info.id) === String(id)
            ? { ...info, content: content, title: title }
            : info,
        );
        setInformations(updatedList);
      }
    } catch (err) {
      alert(err.message);
      return;
    }
    navigate("/");
  };
  return (
    <div className="container-sm mt-4">
      <div className="col my-3">
        <div className="card h-100 shadow border-0">
          <div className="card-header bg-light text-muted">
            {item.created_at}
          </div>
          <div className="card-body d-flex flex-column">
            <div className="mb-3">
              <input
                className="form-control"
                id="exampleFormControlInput1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
            </div>
            <div className="d-flex justify-content-between mt-auto pt-3">
              <button
                className="btn btn-sm btn-outline-primary px-3"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
