/*
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/index.css";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <main className="home-main">
        <h1>Welcome to Resume Builder</h1>
        <p>Create professional resumes quickly and easily.</p>
        <button className="get-started-btn">Get Started</button>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
*/
/*import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/index.css";
import { Link } from "react-router-dom";

/*import { useNavigate } from "react-router-dom";*/


/*const Home = () => {
 /*const navigate = useNavigate();*/
  /* return (
    <div className="home">
      <Header />
      <main className="home-main">
        <div className="home-text">
          <h1>Build Your Professional Resume Effortlessly</h1>
          <p>Create a modern resume in minutes and stand out to recruiters.</p>
          <button className="get-started-btn">Get Started</button>
          <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        </div>
        <div className="home-image">
            <img src={require("../assets/resume.png.jpg")} alt=".Resume Illustration" />

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
*/
/*mport React from "react";
import "../css/index.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <main className="home-main">
        <div className="home-text">
          <h1>Build Your Professional Resume Effortlessly</h1>
          <p>Create a modern resume in minutes and stand out to recruiters.</p>

          <div className="button-group">
            <button className="get-started-btn">Get Started</button>

            <div className="auth-buttons">
              <Link to="/login" className="auth-btn">
                Login
              </Link>
              <Link to="/signup" className="auth-btn">
                Signup
              </Link>
            </div>
          </div>
        </div>

        <div className="home-image">
          <img
            src={require("../assets/resume.png.jpg")}
            alt="Resume Illustration"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
*/
import React from "react";
import "../css/index.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to login page
    navigate("/login");
  };
  return (
    <div className="home">
      <main className="home-main">
        <div className="home-text">
          <h1>Build Your Professional Resume Effortlessly</h1>
          <p>Create a modern resume in minutes and stand out to recruiters.</p>
          <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
        </div>

        <div className="home-image">
          <img
            src={require("../assets/resume.png.jpg")}
            alt="Resume Illustration"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
