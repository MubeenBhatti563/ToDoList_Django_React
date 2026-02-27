import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import Edit from "./components/Edit";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api";

function App() {
  const [informations, setInformations] = useState([]);
  // const isLoggedIn = !!localStorage.getItem("access_token");
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await api.get("/api/lists/");
      setInformations(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.response?.status, err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar setInformations={setInformations} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home
                informations={informations}
                setInformations={setInformations}
                fetchData={fetchData}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create-post"
          element={<NewPost setInformations={setInformations} />}
        />
        <Route
          path="/edit-post/:id"
          element={
            <Edit
              informations={informations}
              setInformations={setInformations}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
