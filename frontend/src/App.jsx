import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import Edit from "./components/Edit";
import ProtectedRoute from "./components/ProtectedRoute";
import ListsContext from "./components/ListsContext";

function App() {
  return (
    <ListsContext>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<NewPost />} />
        <Route path="/edit-post/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ListsContext>
  );
}

export default App;
