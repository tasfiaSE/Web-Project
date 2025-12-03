/* adding manage resume part
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/admin.css";
import { FaFileAlt, FaFlag, FaCog, FaUsers, FaChartBar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [usersCount, setUsersCount] = useState(0);
  const [resumesCount, setResumesCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0); // we use it in UI
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // read token saved by login. (you used localStorage key "adminInfo" in your login)
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  const token = adminInfo?.token;

  // fetch dashboard & users
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token found. Admin not logged in.");
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsersCount(data.totalUsers || 0);
        setResumesCount(data.totalResumes || 0);
        setReportsCount(data.totalReports || 0); // backend may not provide; default 0
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error loading dashboard data", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // toggle activate / deactivate immediately (PATCH)
  const toggleUserStatus = async (id) => {
    if (!token) return console.error("No token");
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/admin/users/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // update local state
      setUsers((prev) => prev.map(u => (u._id === id ? { ...u, isActive: data.isActive } : u)));
    } catch (err) {
      console.error("Failed to toggle user status", err.response?.data || err.message);
      alert("Failed to update user status");
    }
  };

  // filtered users by search text
  const visibleUsers = users.filter(u => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q);
  });

  return (
    <div className="admin-dashboard">
      {/* Sidebar }
      <aside className="sidebar">
        <div className="sidebar-logo">
          
          <h2>Resume<span>Builder</span></h2>
        </div>

        <ul className="sidebar-menu">
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <FaChartBar /> Dashboard
          </li>
          <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
            <FaUsers /> Manage Users
          </li>
          <Link to="/admin/manage-resumes" className="menu-link">
               <li><FaFileAlt /> Manage Resumes</li>
           </Link>


          <li><FaFlag /> Reports</li>
          <li><FaCog /> Settings</li>
        </ul>
      </aside>

      {/* Main content }
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            
            <h1>Admin Dashboard</h1>
          </div>

          <div className="admin-profile">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Admin Avatar" />
            <div className="admin-meta">
              <h4>{adminInfo?.name || "Admin"}</h4>
              <p>{adminInfo?.email || "admin@gmail.com"}</p>
            </div>
          </div>
        </header>

        {/* Overview cards }
        {activeTab === "dashboard" && (
          <section className="cards">
            <div className="card users">
              <h3>Total Users</h3>
              <p>{usersCount}</p>
            </div>
            <div className="card resumes">
              <h3>Total Resumes</h3>
              <p>{resumesCount}</p>
            </div>
            <div className="card reports">
              <h3>Total Reports</h3>
              <p>{reportsCount}</p>
            </div>
          </section>
        )}

        {/* Manage Users Tab }
        {activeTab === "users" && (
          <section className="users-section">
            <div className="section-top">
              <h2>Manage Users</h2>
              <div className="controls">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn-refresh" onClick={() => window.location.reload()}>Refresh</button>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading users...</div>
            ) : (
              <div className="table-wrap">
                <table className="users-table modern">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Resumes</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="user-name">
                          <div className="avatar-placeholder">{(user.name || "U").charAt(0).toUpperCase()}</div>
                          <span>{user.name}</span>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.resumeCount ?? 0}</td>
                        <td>
                          <span className={user.isActive ? "status-pill active" : "status-pill inactive"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button
                            className={user.isActive ? "btn-deactivate" : "btn-activate"}
                            onClick={() => toggleUserStatus(user._id)}
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {visibleUsers.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: "center", padding: 20 }}>No users found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Other tabs placeholder }
        {activeTab === "resumes" && (
          <div style={{ padding: 24 }}>
            <h2>Manage Resumes</h2>
            <p>Coming soon — you can list and delete resumes here.</p>
          </div>
        )}

        <footer className="footer">
          <p>© 2025 ResumeHub Admin Panel | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
*/
/* adding report
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/admin.css";
import { FaFileAlt, FaFlag, FaCog, FaUsers, FaChartBar } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [usersCount, setUsersCount] = useState(0);
  const [resumesCount, setResumesCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // read token saved by login
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  const token = adminInfo?.token;

  // fetch dashboard & users
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token found. Admin not logged in.");
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsersCount(data.totalUsers || 0);
        setResumesCount(data.totalResumes || 0);
        setReportsCount(data.totalReports || 0); // optional
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error loading dashboard data", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // fetch resumes when tab changes
  useEffect(() => {
    const fetchResumes = async () => {
      if (!token || activeTab !== "resumes") return;
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/resumes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResumes(data || []);
      } catch (err) {
        console.error("Error fetching resumes:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [activeTab, token]);

  // toggle activate / deactivate users
  const toggleUserStatus = async (id) => {
    if (!token) return console.error("No token");
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/admin/users/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.map(u => (u._id === id ? { ...u, isActive: data.isActive } : u)));
    } catch (err) {
      console.error("Failed to toggle user status", err.response?.data || err.message);
      alert("Failed to update user status");
    }
  };

  // delete a resume
  const handleDeleteResume = async (id) => {
  if (!window.confirm("Are you sure you want to delete this resume?")) return;
  try {
    await axios.delete(`http://localhost:5000/api/admin/resumes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setResumes((prev) => prev.filter((r) => r._id !== id));
    alert("Resume deleted successfully");
  } catch (error) {
    console.error("Error deleting resume:", error.response?.data || error.message);
    alert("Failed to delete resume");
  }
};


  // filtered users
  const visibleUsers = users.filter(u => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q);
  });

  return (
    <div className="admin-dashboard">
      {/* Sidebar }
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Resume<span>Builder</span></h2>
        </div>

        <ul className="sidebar-menu">
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <FaChartBar /> Dashboard
          </li>
          <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
            <FaUsers /> Manage Users
          </li>
          <li className={activeTab === "resumes" ? "active" : ""} onClick={() => setActiveTab("resumes")}>
            <FaFileAlt /> Manage Resumes
          </li>
          <li><FaFlag /> Reports</li>
          <li><FaCog /> Settings</li>
        </ul>
      </aside>

      {/* Main content }
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
          </div>

          <div className="admin-profile">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Admin Avatar" />
            <div className="admin-meta">
              <h4>{adminInfo?.name || "Admin"}</h4>
              <p>{adminInfo?.email || "admin@gmail.com"}</p>
            </div>
          </div>
        </header>

        {/* Overview cards }
        {activeTab === "dashboard" && (
          <section className="cards">
            <div className="card users">
              <h3>Total Users</h3>
              <p>{usersCount}</p>
            </div>
            <div className="card resumes">
              <h3>Total Resumes</h3>
              <p>{resumesCount}</p>
            </div>
            <div className="card reports">
              <h3>Total Reports</h3>
              <p>{reportsCount}</p>
            </div>
          </section>
        )}

        {/* Manage Users }
        {activeTab === "users" && (
          <section className="users-section">
            <div className="section-top">
              <h2>Manage Users</h2>
              <div className="controls">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn-refresh" onClick={() => window.location.reload()}>Refresh</button>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading users...</div>
            ) : (
              <div className="table-wrap">
                <table className="users-table modern">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Resumes</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="user-name">
                          <div className="avatar-placeholder">{(user.name || "U").charAt(0).toUpperCase()}</div>
                          <span>{user.name}</span>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.resumeCount ?? 0}</td>
                        <td>
                          <span className={user.isActive ? "status-pill active" : "status-pill inactive"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button
                            className={user.isActive ? "btn-deactivate" : "btn-activate"}
                            onClick={() => toggleUserStatus(user._id)}
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {visibleUsers.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: "center", padding: 20 }}>No users found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Manage Resumes }
        {activeTab === "resumes" && (
          <section className="users-section">
            <div className="section-top">
              <h2>Manage Resumes</h2>
              <div className="controls">
                <button className="btn-refresh" onClick={() => setActiveTab("resumes")}>Refresh</button>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading resumes...</div>
            ) : (
              <div className="table-wrap">
                <table className="users-table modern">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumes.map((resume, index) => (
                      <tr key={resume._id}>
                        <td>{index + 1}</td>
                        <td>{resume.title}</td>
                        <td>{resume.user?.name}</td>
                        <td>{resume.user?.email}</td>
                        <td>{new Date(resume.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className="btn-deactivate" onClick={() => handleDeleteResume(resume._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {resumes.length === 0 && (
                      <tr><td colSpan="6" style={{ textAlign: "center", padding: 20 }}>No resumes found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        <footer className="footer">
          <p>© 2025 ResumeBuilder Admin Panel | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/admin.css";
import { FaFileAlt, FaFlag, FaCog, FaUsers, FaChartBar } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [usersCount, setUsersCount] = useState(0);
  const [resumesCount, setResumesCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [reportSearch, setReportSearch] = useState("");

  // read token saved by login
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  const token = adminInfo?.token;

  // fetch dashboard & users
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token found. Admin not logged in.");
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsersCount(data.totalUsers || 0);
        setResumesCount(data.totalResumes || 0);
        setReportsCount(data.totalReports || 0);
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error loading dashboard data", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // fetch resumes when tab changes
  useEffect(() => {
    const fetchResumes = async () => {
      if (!token || activeTab !== "resumes") return;
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/resumes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResumes(data || []);
      } catch (err) {
        console.error("Error fetching resumes:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [activeTab, token]);

  // fetch reports when tab changes
  useEffect(() => {
    const fetchReports = async () => {
      if (!token || activeTab !== "reports") return;
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(data || []);
      } catch (err) {
        console.error("Error fetching reports:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [activeTab, token]);

  // toggle activate / deactivate users
  const toggleUserStatus = async (id) => {
    if (!token) return console.error("No token");
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/admin/users/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.map(u => (u._id === id ? { ...u, isActive: data.isActive } : u)));
    } catch (err) {
      console.error("Failed to toggle user status", err.response?.data || err.message);
      alert("Failed to update user status");
    }
  };

  // delete a resume
  const handleDeleteResume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/resumes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes((prev) => prev.filter((r) => r._id !== id));
      alert("Resume deleted successfully");
    } catch (error) {
      console.error("Error deleting resume:", error.response?.data || error.message);
      alert("Failed to delete resume");
    }
  };

  // delete a report
  const handleDeleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports((prev) => prev.filter((r) => r._id !== id));
      alert("Report deleted successfully");
    } catch (error) {
      console.error("Error deleting report:", error.response?.data || error.message);
      alert("Failed to delete report");
    }
  };

  // filtered users
  const visibleUsers = users.filter(u => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q);
  });

  // filtered reports
  const visibleReports = reports.filter(r => {
    const q = reportSearch.trim().toLowerCase();
    if (!q) return true;
    return (r.reporterName || "").toLowerCase().includes(q) ||
           (r.resumeTitle || "").toLowerCase().includes(q) ||
           (r.reason || "").toLowerCase().includes(q);
  });

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Resume<span>Builder</span></h2>
        </div>

        <ul className="sidebar-menu">
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <FaChartBar /> Dashboard
          </li>
          <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
            <FaUsers /> Manage Users
          </li>
          <li className={activeTab === "resumes" ? "active" : ""} onClick={() => setActiveTab("resumes")}>
            <FaFileAlt /> Manage Resumes
          </li>
          <li className={activeTab === "reports" ? "active" : ""} onClick={() => setActiveTab("reports")}>
            <FaFlag /> Reports
          </li>
          <li><FaCog /> Settings</li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <h1>Admin Dashboard</h1>
          </div>

          <div className="admin-profile">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Admin Avatar" />
            <div className="admin-meta">
              <h4>{adminInfo?.name || "Admin"}</h4>
              <p>{adminInfo?.email || "admin@gmail.com"}</p>
            </div>
          </div>
        </header>

        {/* Overview cards */}
        {activeTab === "dashboard" && (
          <section className="cards">
            <div className="card users">
              <h3>Total Users</h3>
              <p>{usersCount}</p>
            </div>
            <div className="card resumes">
              <h3>Total Resumes</h3>
              <p>{resumesCount}</p>
            </div>
            <div className="card reports">
              <h3>Total Reports</h3>
              <p>{reportsCount}</p>
            </div>
          </section>
        )}

        {/* Manage Users */}
        {activeTab === "users" && (
          <section className="users-section">
            <div className="section-top">
              <h2>Manage Users</h2>
              <div className="controls">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn-refresh" onClick={() => window.location.reload()}>Refresh</button>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading users...</div>
            ) : (
              <div className="table-wrap">
                <table className="users-table modern">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Resumes</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="user-name">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.resumeCount ?? 0}</td>
                        <td>
                          <span className={user.isActive ? "status-pill active" : "status-pill inactive"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button
                            className={user.isActive ? "btn-deactivate" : "btn-activate"}
                            onClick={() => toggleUserStatus(user._id)}
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {visibleUsers.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: "center", padding: 20 }}>No users found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Manage Resumes */}
        {activeTab === "resumes" && (
          <section className="users-section">
            <div className="section-top">
              <h2>Manage Resumes</h2>
              <div className="controls">
                <button className="btn-refresh" onClick={() => setActiveTab("resumes")}>Refresh</button>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading resumes...</div>
            ) : (
              <div className="table-wrap">
                <table className="users-table modern">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumes.map((resume, index) => (
                      <tr key={resume._id}>
                        <td>{index + 1}</td>
                        <td>{resume.title}</td>
                        <td>{resume.user?.name}</td>
                        <td>{resume.user?.email}</td>
                        <td>{new Date(resume.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className="btn-deactivate" onClick={() => handleDeleteResume(resume._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {resumes.length === 0 && (
                      <tr><td colSpan="6" style={{ textAlign: "center", padding: 20 }}>No resumes found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Reports Section */}
        {activeTab === "reports" && (
          <section className="users-section">
            <div className="section-top">
              <h2>Reports</h2>
              <div className="controls">
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={reportSearch}
                  onChange={(e) => setReportSearch(e.target.value)}
                />
                <button className="btn-refresh" onClick={() => setActiveTab("reports")}>Refresh</button>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading reports...</div>
            ) : (
              <div className="table-wrap">
                <table className="users-table modern">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Reporter</th>
                      <th>Resume / User</th>
                      <th>Reason</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleReports.map((r, index) => (
                      <tr key={r._id}>
                        <td>{index + 1}</td>
                        <td>{r.reporterName}</td>
                        <td>{r.resumeTitle || r.userEmail}</td>
                        <td>{r.reason}</td>
                        <td>
                          <button className="btn-deactivate" onClick={() => handleDeleteReport(r._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {visibleReports.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: "center", padding: 20 }}>No reports found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        <footer className="footer">
          <p>© 2025 ResumeBuilder Admin Panel | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
