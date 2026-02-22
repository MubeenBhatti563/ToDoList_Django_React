import React from "react";
import { Link, useParams } from "react-router-dom";
import { data } from "../components/data";

const Edit = () => {
  const { id } = useParams();
  const item = data.filter((i) => i.id === Number(id));
  console.log(item);
  return (
    <div className="container-sm mt-4">
      <div className="col my-3">
        <div className="card h-100 shadow border-0">
          <div className="card-header bg-light text-muted">{item[0].date}</div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-bold">{item[0].title}</h5>
            <div className="card-text text-secondary">
              <div className="transition-wrapper collapsed">
                {item[0].content}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-auto pt-3">
              <button className="btn btn-sm btn-outline-primary px-3">
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
