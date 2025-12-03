/*import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewResume = () => {
  const [resumes, setResumes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResumes = async () => {
      const { data } = await axios.get("/api/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(data);
    };
    fetchResumes();
  }, [token]);

  return (
    <div className="view-resume-container">
      <h2>Saved Resumes</h2>
      {resumes.map((resume) => (
        <div key={resume._id} className="resume-card">
          <h3>{resume.name}</h3>
          <p>{resume.email}</p>
          <p>{resume.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewResume;
*/

/*
import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewResumes = () => {
  const [resumes, setResumes] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    const fetchResumes = async () => {
      const { data } = await axios.get("http://localhost:5000/api/resume", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(data);
    };
    fetchResumes();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    await axios.delete(`http://localhost:5000/api/resume/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setResumes(resumes.filter((r) => r._id !== id));
  };

  const handleDownload = (id) => {
    window.open(`http://localhost:5000/api/resume/download/${id}?token=${token}`, "_blank");
  };

  return (
    <div className="view-resumes-container">
      <h2>My Resumes</h2>
      <div className="resume-list">
        {resumes.length === 0 ? (
          <p>No resumes found.</p>
        ) : (
          resumes.map((resume) => (
            <div className="resume-card" key={resume._id}>
              <h3>{resume.name}</h3>
              <p>{resume.title}</p>
              <p>{resume.email}</p>
              <div className="buttons">
                <button onClick={() => handleDownload(resume._id)}>Download</button>
                <button onClick={() => handleDelete(resume._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewResumes;
*/

/* adding style
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // Icon for delete
import "../css/ViewResume.css"; // CSS file for styling

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
console.log("User info from localStorage:", userInfo);

const token = userInfo?.token;
console.log("Token:", token);



const ViewResume = () => {
  const [resumes, setResumes] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
  const fetchResumes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/resume", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched resumes:", data); // <-- add this
      setResumes(Array.isArray(data) ? data : data.resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error.response?.data || error.message);
    }
  };
  fetchResumes();
}, [token]);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const handleDownload = (id) => {
    window.open(`http://localhost:5000/api/resume/download/${id}?token=${token}`, "_blank");
  };

  return (
    <div className="view-resumes-container">
      <h2>My Resumes</h2>
      <div className="resume-list">
        {resumes.length === 0 ? (
          <p className="no-resumes">No resumes found.</p>
        ) : (
          resumes.map((resume) => (
            <div className="resume-card" key={resume._id}>
              <div className="resume-info">
                <h3>{resume.name}</h3>
                <p className="title">{resume.title}</p>
                <p className="email">{resume.email}</p>
              </div>
              <div className="buttons">
                <button className="download-btn" onClick={() => handleDownload(resume._id)}>
                  Download
                </button>
                <button className="delete-btn" onClick={() => handleDelete(resume._id)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewResume;

*/

/* add korram new na oile delete kormu

import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaDownload } from "react-icons/fa";
import "../css/ViewResume.css";

const ViewResume = () => {
  const [resumes, setResumes] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/resume", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResumes(Array.isArray(data) ? data : data.resumes);
      } catch (error) {
        console.error("Error fetching resumes:", error.response?.data || error.message);
      }
    };
    fetchResumes();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  const handleDownload = (id) => {
    window.open(`http://localhost:5000/api/resume/download/${id}?token=${token}`, "_blank");
  };
 const renderTemplatePreview = (template, data) => {
  // add default theme + handle undefined safely
  const safeData = {
    ...data,
    theme: data?.theme || { primary: "#7a3cff", secondary: "#ffffff" },
  };

  switch (template) {
    case "Template 1":
      return <Template1 data={safeData} />;
    case "Template 2":
      return <Template2 data={safeData} />;
    case "Template 3":
      return <Template3 data={safeData} />;
    case "Template 4":
      return <Template4 data={safeData} />;
    default:
      return <Template1 data={safeData} />;
  }
};

  return (
    <div className="view-container">
      <h2 className="page-title">My Saved Resumes</h2>
      {resumes.length === 0 ? (
        <p className="no-resume-text">No resumes found. Create one to get started!</p>
      ) : (
        <div className="resume-grid">
  {resumes.map((resume) => (
    <div className="template-card" key={resume._id}>
      <div className="template-preview">
        {renderTemplatePreview(resume.template, resume)}
      </div>

      <div className="template-footer">
        <h4>{resume.name || "Untitled Resume"}</h4>
        <div className="button-group">
          <button
            className="btn view-btn"
            onClick={() => window.open(`/view/${resume._id}`, "_blank")}
          >
            View
          </button>
          <button
            className="btn download-btn"
            onClick={() => handleDownload(resume._id)}
          >
            <FaDownload /> Download
          </button>
          <button
            className="btn delete-btn"
            onClick={() => handleDelete(resume._id)}
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

 )}
    </div>
  );
};

export default ViewResume;
*/
/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import "../css/ViewResume.css";
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2"; // if you have more templates

const ViewResume = () => {
  const [resumes, setResumes] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/resume", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched resume data --->", data);

        setResumes(Array.isArray(data) ? data : data.resumes);
      } catch (error) {
        console.error("Error fetching resumes:", error.response?.data || error.message);
      }
    };
    fetchResumes();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  

  const renderTemplatePreview = (resume) => {
    // Select template dynamically
    switch (resume.template) {
      case "Template1":
        return <Template1 data={resume} theme={{ primary: "#1a73e8", secondary: "#f5f7fa" }} />;
      case "Template2":
        return <Template2 data={resume} theme={{ primary: "#673ab7", secondary: "#faf7ff" }} />;
      default:
        return <Template1 data={resume} theme={{ primary: "#1a73e8", secondary: "#f5f7fa" }} />;
    }
  };

  return (
    <div className="view-container">
      <h2 className="page-title">My Saved Resumes</h2>
      {resumes.length === 0 ? (
        <p className="no-resume-text">No resumes found. Create one to get started!</p>
      ) : (
        <div className="resume-preview-grid">
          {resumes.map((resume) => (
            <div className="resume-preview-card" key={resume._id}>
              <div className="resume-preview-content">
                {/* Show a mini preview of the resume }
                <div className="resume-preview">{renderTemplatePreview(resume)}</div>
              </div>

              {/* Buttons }
              <div className="resume-preview-actions">
                <button
                  className="btn view-btn"
                  onClick={() => (window.location.href = `/resume/${resume._id}`)}
                >
                  View
                </button>
                <button className="btn delete-btn" onClick={() => handleDelete(resume._id)}>
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewResume;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import "../css/ViewResume.css";

import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";

const ViewResume = () => {
  const [resumes, setResumes] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/resume", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched resume data --->", data);
        setResumes(Array.isArray(data) ? data : data.resumes);
      } catch (error) {
        console.error("Error fetching resumes:", error.response?.data || error.message);
      }
    };
    fetchResumes();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  // Render the selected template preview
  const renderTemplatePreview = (resume) => {
  switch (resume.template) {
    case "1":
      return <Template1 data={resume} theme={{ primary: "#1a73e8", secondary: "#f5f7fa" }} />;
    case "2":
      return <Template2 data={resume} theme={{ primary: "#673ab7", secondary: "#faf7ff" }} />;
    case "3":
      return <Template3 data={resume} theme={{ primary: "#ff6f00", secondary: "#fff7e6" }} />;
    case "4":
      return <Template4 data={resume} theme={{ primary: "#00695c", secondary: "#e0f2f1" }} />;
    default:
      return <p style={{ fontSize: "14px", color: "gray" }}>No template selected</p>;
  }
};
  return (
    <div className="view-container">
      <h2 className="page-title">My Saved Resumes</h2>

      {resumes.length === 0 ? (
        <p className="no-resume-text">No resumes found. Create one to get started!</p>
      ) : (
        <div className="resume-preview-grid">
          {resumes.map((resume) => (
            <div className="resume-preview-card" key={resume._id}>
              
              <div className="resume-preview-content">
                <div className="resume-preview">{renderTemplatePreview(resume)}</div>
              </div>

              <div className="resume-preview-actions">
                <button
                  className="btn view-btn"
                  onClick={() => (window.location.href = `/resume/${resume._id}`)}
                >
                  View
                </button>

                <button className="btn delete-btn" onClick={() => handleDelete(resume._id)}>
                  <FaTrashAlt /> Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewResume;
