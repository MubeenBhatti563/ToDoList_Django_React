import React, { createContext, useReducer, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const ListProvider = createContext();
const initialState = {
  informations: [],
  error: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "lists":
      return {
        ...state,
        informations: action.payload,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
};
const ListsContext = ({ children }) => {
  const [{ informations }, dispatch] = useReducer(reducer, initialState);
  const [isComment, setIsComment] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await api.get("/api/lists/");
      dispatch({ type: "lists", payload: res.data });
    } catch (err) {
      dispatch({ type: "error", payload: err.mssage });
    }
  };
  const deletePost = async (id) => {
    const item = informations.find((i) => i.id === id);
    const conf = confirm(`Do you reall want to delete this post ${item.title}`);
    if (conf) {
      try {
        await api.delete(`/api/lists/${id}/`);
        dispatch({
          type: "lists",
          payload: informations.filter((item) => item.id !== id),
        });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
        alert(err.message);
      }
    }
  };
  const logout = () => {
    const check = confirm("Do you want to logout?");
    if (check) {
      localStorage.clear();
      navigate("/login");
    }
  };
  const handleLike = async (postId) => {
    try {
      await api.post(`/api/likes/`, { post: postId });
      fetchData();
    } catch (err) {
      console.error("Error toggling like", err.message);
    }
  };
  return (
    <ListProvider.Provider
      value={{
        informations: informations,
        dispatch: dispatch,
        deletePost: deletePost,
        fetchData: fetchData,
        logout: logout,
        isComment,
        setIsComment,
        handleLike,
      }}
    >
      {children}
    </ListProvider.Provider>
  );
};

export { ListProvider };
export default ListsContext;
