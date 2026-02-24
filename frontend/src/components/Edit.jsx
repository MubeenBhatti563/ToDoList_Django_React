import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = ({ informations, setInformations }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = informations.find((i) => i.id === Number(id));
  const [content, setContent] = useState(item ? item.content : "");

  const handleUpdate = () => {
    const updatedList = informations.map((info) =>
      String(info.id) === String(id) ? { ...info, content: content } : info,
    );

    setInformations(updatedList);
    navigate("/");
  };
  return (
    <div className="container-sm mt-4">
      <div className="col my-3">
        <div className="card h-100 shadow border-0">
          <div className="card-header bg-light text-muted">{item.date}</div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-bold">{item.title}</h5>
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
