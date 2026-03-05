import React, { useState } from "react";
import useLists from "./useLists";

const Comments = () => {
  const [show, setShow] = useState(true);
  const { setIsComment } = useLists();

  if (!show) return null;

  return (
    <div
      className="vh-100 w-100 d-flex justify-content-center align-items-center position-fixed top-0 start-0"
      style={{
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(0,0,0,0.2)",
        zIndex: 1050,
      }}
    >
      <div
        className="toast show border-0 shadow-lg" // Added shadow for depth
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ width: "100%", maxWidth: "500px" }} // Responsive width
      >
        <div className="toast-header bg-primary text-white">
          <strong className="me-auto">Post Comments</strong>
          <small>3 New</small>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => {
              setShow(false);
              setIsComment(false);
            }}
            aria-label="Close"
          ></button>
        </div>

        <div
          className="toast-body bg-light"
          style={{ maxHeight: "400px", overflowY: "auto" }}
        >
          {/* Single Comment Item */}
          <div className="p-2 mb-3 bg-white rounded shadow-sm">
            <div className="d-flex align-items-center gap-2 mb-2">
              <img
                src="https://plus.unsplash.com/premium_photo-1661603403807-aa68bfcc983a?q=80&w=387&auto=format&fit=crop"
                alt="profile"
                width="32px"
                height="32px"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <h6 className="mb-0">Jane Doe</h6>
              <small className="text-muted ms-auto">2m ago</small>
            </div>
            <p
              className="mb-0 small text-secondary"
              style={{ lineHeight: "1.4" }}
            >
              Hello, world! This is a toast message. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Reiciendis dolores facere aut atque.
            </p>
          </div>

          {/* You can map over an array of comments here */}
        </div>

        <div className="p-3 border-top bg-white">
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Write a comment..."
            />
            <button className="btn btn-outline-primary" type="button">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
