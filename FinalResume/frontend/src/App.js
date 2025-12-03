
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateResume from "./pages/CreateResume";
import ViewResume from "./pages/ViewResume"; // adjust the path as needed
import SingleResumeView from "./pages/SingleResumeView";
import EditResume from "./pages/EditResume";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-resume" element={<CreateResume />} />
        <Route path="/view-resume" element={<ViewResume />} />
        <Route path="/resume/:id" element={<SingleResumeView />} />
        <Route path="/editresume/:id" element={<EditResume />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
