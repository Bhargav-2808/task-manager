import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/sign-in/Login";
import SignUp from "./pages/sign-up/SignUp";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/Header/ProtectedRoute";
import GoogleAuth from "./pages/home/GoogleAuth";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/google-auth-success" element={<GoogleAuth />} />
      </Routes>
    </>
  );
}

export default App;
