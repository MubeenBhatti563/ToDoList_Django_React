import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLists from "../components/useLists";
import Comments from "../components/Comments";

// 1. Create a sub-component for the Individual Card
const LIMIT = 70;
const PostCard = ({ item }) => {
  const { deletePost, isComment, setIsComment, handleLike } = useLists();
  const [isExpanded, setIsExpanded] = useState(false);
  const [localIsLiked, setLocalIsLiked] = useState(item.is_liked);
  const [localLikeCount, setLocalLikeCount] = useState(item.like_count);

  const onLikeToggle = async () => {
    // Optimistic Update
    setLocalIsLiked(!localIsLiked);
    setLocalLikeCount(localIsLiked ? localLikeCount - 1 : localLikeCount + 1);

    await handleLike(item.id);
  };
  return (
    <div className="col my-3">
      {isComment && <Comments />}
      <div className="card h-100 shadow border-0">
        <div className="card-header bg-light text-muted">
          {item.created_at.slice(0, 10)}
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{item.title}</h5>
          <div className="card-text text-secondary">
            <div
              className={`transition-wrapper ${isExpanded ? "open" : "collapsed"}`}
            >
              {isExpanded ? item.content : `${item.content.slice(0, LIMIT)}...`}
            </div>
            <span
              className="btn btn-link p-0 ms-1 text-decoration-none fw-bold"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ cursor: "pointer", fontSize: "0.9rem" }}
            >
              {isExpanded ? "Show less" : "Read more"}
            </span>
          </div>
          <div className="mt-auto w-100">
            <div className="d-flex justify-content-between mt-auto pt-3">
              <Link
                to={`/edit-post/${item.id}`}
                className="btn btn-sm btn-outline-primary px-3"
              >
                Edit
              </Link>
              <button
                className="btn btn-sm btn-outline-danger px-3"
                onClick={() => deletePost(item.id)}
              >
                Delete
              </button>
            </div>
            <div className="d-flex justify-content-between mt-auto pt-3">
              <button
                className={`btn btn-sm ${localIsLiked ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={onLikeToggle}
              >
                {localIsLiked ? "❤️ Liked" : "🤍 Like"} ({localLikeCount})
              </button>
              <button
                className="btn btn-sm text-dark px-3"
                onClick={() => {
                  setIsComment(true);
                }}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { fetchData, informations } = useLists();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container mt-4">
      {informations.length === 0 ? (
        <h3 className="mt-5 text-muted text-center italic">
          You don't have any posts yet!
        </h3>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mt-4">
          {informations.map((item) => (
            <PostCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
