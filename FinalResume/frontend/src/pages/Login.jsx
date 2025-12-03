/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
}
*/
/* adding token
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 /* const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      //localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };
  */
 /*
  const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });

    // ✅ Token localStorage এ রাখো
    localStorage.setItem("token", response.data.token);

    // চাইলে পুরো ইউজার ডেটাও রাখো
    localStorage.setItem("userInfo", JSON.stringify(response.data));

    navigate("/dashboard");
  } catch (error) {
    console.error("Login failed:", error);
  }
};


  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Login</button>

          <p className="auth-switch">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ অবশ্যই এটা যোগ করতে হবে
import "../css/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ form submit হলে reload বন্ধ করার জন্য

    try {
      const response = await axios.post("https://resume-backend-ynv6.onrender.com/api/users/login", {
        email,
        password,
      });

      // ✅ Token এবং user info localStorage এ রাখো
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to your account</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn">Login</button>

          <p className="auth-switch">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
