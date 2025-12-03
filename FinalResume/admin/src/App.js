import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ManageUsers from "./pages/ManageUsers";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import ManageResume from "./pages/ManageResume";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/admin/manage-resumes" element={<ManageResume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
