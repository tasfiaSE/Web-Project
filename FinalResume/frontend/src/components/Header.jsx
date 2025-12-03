/*// src/components/Header.jsx
import React from "react";
import "../css/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Signup</button>
      </div>
      <div className="header-right">
        <h1 className="logo">Resume Builder</h1>
      </div>
    </header>
  );
};

export default Header;
*/

/*import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Resume Builder</div>
      <div className="nav-buttons">
       <Link to="/login">
           <button className="login-btn">Login</button>
       </Link>
       <Link to="/login">
           <button className="login-btn">SignUp</button>
       </Link>
      </div>
    </header>
  );
};

export default Header;
*/
/* tik korram
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Resume<span>Builder</span></Link>
      </div>

      
      {!isDashboard && (
        <div className="nav-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn signup-btn">Signup</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
*/
/*
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation();

  // শুধু Home page এ login/signup দেখাবে
  const isHome = location.pathname === "/";

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Resume<span>Builder</span></Link>
      </div>

      {/* শুধুমাত্র home page এ login/signup দেখাবে }
      {isHome && (
        <div className="nav-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn signup-btn">Signup</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
*/
/* profile add diram
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation();

  // শুধু Home page এ login/signup দেখাবে
  const isHome = location.pathname === "/";

  return (
    <header className="header">
      <div className="logo">
        <Link to="/dashboard">Resume<span>Builder</span></Link>
      </div>

      
      {isHome && (
        <div className="nav-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn signup-btn">Signup</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
*/
/* profile add
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(storedUser);
  }, []);

  const handleProfileClick = () => {
    navigate("/dashboard"); // আপনি চাইলে অন্য কোনো পেজে রিডাইরেক্ট দিতে পারেন
  };

  return (
    <header className="header">
      <div className="header-left">
        
        {user && user.profilePic && (
          <img
            src={`http://localhost:5000${user.profilePic}`}
            alt="Profile"
            className="header-profile-img"
            onClick={handleProfileClick}
          />
        )}

        <div className="logo">
          <Link to="/dashboard">
            Resume<span>Builder</span>
          </Link>
        </div>
      </div>

      
      {isHome && (
        <div className="nav-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn signup-btn">Signup</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
*/
/* login and signup tik korram
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user info initially
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(storedUser);

    // Listen for updates in localStorage (profile changes)
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("userInfo"));
      setUser(updatedUser);
    };

    // Listen for storage updates
    window.addEventListener("storage", handleStorageChange);

    // Custom event for instant update after profile save
    window.addEventListener("userProfileUpdated", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userProfileUpdated", handleStorageChange);
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/dashboard");
  };

  return (
 <header className="header">
  <div className="header-left">
    <div className="logo">
      <Link to="/dashboard">
        Resume<span>Builder</span>
      </Link>
    </div>
  </div>

  <div className="header-right">
    {user && user.profilePic ? (
      <img
        src={
          user.profilePic.startsWith("http")
            ? user.profilePic
            : `http://localhost:5000${user.profilePic}`
        }
        alt="Profile"
        className="header-profile-img"
        onClick={handleProfileClick}
      />
    ) : (
      isHome && (
        <div className="nav-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn signup-btn">Signup</Link>
        </div>
      )
    )}
  </div>
</header>

  );
};

export default Header;
*/
/* Profile tik korram
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(storedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("userInfo"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userProfileUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userProfileUpdated", handleStorageChange);
    };
  }, []);

  const handleProfileClick = () => {
    navigate("/dashboard");
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to={user ? "/dashboard" : "/"}>
              Resume<span>Builder</span>
          </Link>
        </div>
      </div>

      <div className="header-right">
        {user && user.profilePic ? (
          <img
            src={
              user.profilePic.startsWith("http")
                ? user.profilePic
                : `http://localhost:5000${user.profilePic}`
            }
            alt="Profile"
            className="header-profile-img"
            onClick={handleProfileClick}
          />
        ) : (
          isHome && (
            <div className="nav-buttons">
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/signup" className="btn signup-btn">Signup</Link>
            </div>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
*/
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Header.css";


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [user, setUser] = useState(null);

  // Pages where profile should NOT appear
  const hiddenPages = ["/", "/login", "/signup"];
  const isHiddenPage = hiddenPages.includes(location.pathname);

useEffect(() => {
  const handleUserProfileUpdate = () => {
  const updatedUserString = localStorage.getItem("userInfo");
  console.log("Raw localStorage userInfo:", updatedUserString);
  const updatedUser = updatedUserString ? JSON.parse(updatedUserString) : null;
  console.log("Header detected event:", updatedUser);
  setUser(updatedUser);
};
  window.addEventListener("userProfileUpdated", handleUserProfileUpdate);

  return () => {
    window.removeEventListener("userProfileUpdated", handleUserProfileUpdate);
  };
}, []);


  const handleProfileClick = () => {
    navigate("/dashboard");
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          {/* <Link to={user ? "/dashboard" : "/"}> */}
          <Link to={"/dashboard"}>
              Resume<span>Builder</span>
          </Link>
        </div>
      </div>

      <div className="header-right">
        {/* Show profile only if user exists AND we are NOT on hidden pages */}
       {user && user.profilePic && !isHiddenPage ? (
  <img
    src={user.profilePic}   // সরাসরি user.profilePic
    alt="Profile"
    className="header-profile-img"
    onClick={handleProfileClick}
  />
) : (
          isHome && (
            <div className="nav-buttons">
              <Link to="/login" className="btn login-btn">Login</Link>
              <Link to="/signup" className="btn signup-btn">Signup</Link>
            </div>
          )
)}

      </div>
    </header>
  );
};

export default Header;
