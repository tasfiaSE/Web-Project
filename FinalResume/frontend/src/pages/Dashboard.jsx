import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = user?.token;

  const [resumes, setResumes] = useState([]);
  const [userProfile, setUserProfile] = useState(user || {});
  const [profileImage, setProfileImage] = useState(user?.profilePic || "");
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Handle profile input changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        "https://resume-backend-ynv6.onrender.com/api/users/profile", // your API endpoint
        {
          name: userProfile.name,
          email: userProfile.email,
          profilePic: profileImage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserProfile(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("Saved to localStorage:", data);
      window.dispatchEvent(new Event("userProfileUpdated"));

      alert("Profile updated successfully!");
      setShowProfileModal(false); // Close modal after save
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile.");
    }
    setLoading(false);
  
  };

  // Fetch user resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await axios.get("https://resume-backend-ynv6.onrender.com/api/resume", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResumes(data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    if (token) fetchResumes();
  }, [token]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token"); // if you also stored a token
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Menu</h3>
        <ul className="menu-top">
          <li>My Resumes</li>
          <li onClick={() => setShowProfileModal(true)}>Profile</li>
        </ul>

        <ul className="menu-bottom">
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* ===== Profile Modal Start ===== */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on clicking inside
          >
            <h2>Update Profile</h2>
            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="profile-image-preview">
                <img src={profileImage || "/default-profile.png"} alt="Profile" />
              </div>
              <input type="file" onChange={handleImageChange} accept="image/*" />

              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userProfile.name || ""}
                onChange={handleProfileChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userProfile.email || ""}
                onChange={handleProfileChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Profile"}
                </button>
                <button type="button" onClick={() => setShowProfileModal(false)}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ===== Profile Modal End ===== */}

      <main className="dashboard-content">
        <h1>Welcome, {user?.name || "User"} 👋</h1>
        <p>
          Here you can manage your resumes, update your profile, and customize your account.
        </p>

        <div className="card-container">
          <div className="card">
            <h2>📝 Create New Resume</h2>
            <p>Build a new professional resume in minutes.</p>
            <Link to="/create-resume">
              <button>Create Resume</button>
            </Link>
          </div>

          <div className="card">
            <h2>📂 View Saved Resumes</h2>
            <p>Access and edit your existing resumes easily.</p>
            <Link to="/view-resume">
              <button>View Resumes</button>
            </Link>
          </div>

          <div className="card">
            <h2>Update Resumes</h2>
            <p>Update your details and preferences.</p>
            {resumes.length > 0 ? (
              resumes.map((resume) => (
                <Link key={resume._id} to={`/editresume/${resume._id}`}>
                  <button>Edit {resume.name}'s Resume</button>
                </Link>
              ))
            ) : (
              <p>No resumes available to edit</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
