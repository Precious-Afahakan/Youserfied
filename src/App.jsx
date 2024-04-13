import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import { ProtectedRoute } from "./components/ProtectedRoute";
import RegAsAdmin from "./components/RegAsAdmin";
import WriteStory from "./components/WriteStory";
import Library from "./components/Library";
import Update from "./components/Update";
import "./App.css";

const App = () => {
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    const novels = JSON.parse(localStorage.getItem("novels"));
    if (!novels) {
      localStorage.setItem("novels", JSON.stringify([]));
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/register" element={<RegAsAdmin />} />
          <Route path="/admin/write-story" element={<WriteStory />} />
          <Route path="/admin/update" element={<Update />} />
          <Route path="library" element={<Library />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
