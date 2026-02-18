import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostDel from "./components/PostDel";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<NewPost />} />
        <Route path="/delete-post/:id" element={<PostDel />} />
        <Route path="/edit-post/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
