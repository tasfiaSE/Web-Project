import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/editresume.css";

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  const [formData, setFormData] = useState({
    name: "",
    objective: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    skills: "",
    experience: [],
    education: [],
    projects: [],
  });

  const [loading, setLoading] = useState(true);

  // 🟩 Fetch existing resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/resume/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(data)

        setFormData({
          ...data,
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : data.skills || "",
          experience: Array.isArray(data.experience) ? data.experience : [],
          education: Array.isArray(data.education) ? data.education : [],
          projects: Array.isArray(data.projects) ? data.projects : [],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching resume:", error);
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, token]);

  // 🟩 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟩 Add new section items
    const addExperience = () => {
  setFormData((prev) => {
    const updated = {
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", duration: "", description: "" },
      ],
    };

    console.log("➤ Experience after adding:", updated.experience);
    return updated;
  });
};
      
    
  const addEducation = () =>
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "" }],
    }));

  const addProject = () =>
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "" }],
    }));

  // 🟩 Handle updates to section fields
  const handleArrayChange = (index, field, value, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  // 🟩 Save handler
  const handleSave = async (e) => {
    console.log("📌 Final experience before submit:", formData.experience);
    e.preventDefault();

    console.log(formData)
    try {
      await axios.put(`http://localhost:5000/api/resume/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Resume updated successfully!");
      navigate("/view-resume");
    } catch (error) {
      console.error("Error updating resume:", error);
      alert("Failed to update resume. Try again.");
    }
  };

  if (loading) return <p>Loading resume...</p>;

  return (
    <div className="edit-resume-container">
      <div className="edit-resume-card">
        <h2 className="edit-title">Edit Resume</h2>

        <form onSubmit={handleSave} className="edit-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            <label>Name:</label>
            <input name="name" value={formData.name} onChange={handleChange} required />

            <label>Title:</label>
            <input name="objective" value={formData.objective} onChange={handleChange} required />

            <label>Email:</label>
            <input name="email" value={formData.email} onChange={handleChange} required />

            <label>Phone:</label>
            <input name="phone" value={formData.phone} onChange={handleChange} required />

            <label>Address:</label>
            <input name="address" value={formData.address} onChange={handleChange} required />

            <label>Summary:</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="4"
              placeholder="Write a short professional summary..."
            />

            <label>Skills (comma separated):</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB..."
            />
          </div>

          {/* Experience Section */}
          <div className="form-section">
           <h3>Experience</h3>
             {formData.experience.map((exp, index) => (
             <div key={index} className="card-box">
      
             <input
             type="text"
             placeholder="Job Title"
             value={exp.title || ""}
              onChange={(e) =>
              handleArrayChange(index, "title", e.target.value, "experience")
             }
           />

           <input
           type="text"
           placeholder="Company"
           value={exp.company || ""}
           onChange={(e) =>
           handleArrayChange(index, "company", e.target.value, "experience")
          }
          />

          <input
           type="text"
           placeholder="Duration"
           value={exp.duration || ""}
           onChange={(e) =>
           handleArrayChange(index, "duration", e.target.value, "experience")
          }
         />

         <textarea
          placeholder="Description"
          value={exp.description || ""}
          onChange={(e) =>
          handleArrayChange(index, "description", e.target.value, "experience")
          }
         />
    </div>
  ))}


          
            <button type="button" className="add-btn" onClick={addExperience}>
              + Add Experience
            </button>
          </div>

          {/* Education Section */}
          <div className="form-section">
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="card-box">
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleArrayChange(index, "degree", e.target.value, "education")
                  }
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    handleArrayChange(index, "institution", e.target.value, "education")
                  }
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) =>
                    handleArrayChange(index, "year", e.target.value, "education")
                  }
                />
              </div>
            ))}
            <button type="button" className="add-btn" onClick={addEducation}>
              + Add Education
            </button>
          </div>

          {/* Projects Section */}
          <div className="form-section">
            <h3>Projects</h3>
            {formData.projects.map((proj, index) => (
              <div key={index} className="card-box">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) =>
                    handleArrayChange(index, "title", e.target.value, "projects")
                  }
                />
                <textarea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) =>
                    handleArrayChange(index, "description", e.target.value, "projects")
                  }
                />
              </div>
            ))}
            <button type="button" className="add-btn" onClick={addProject}>
              + Add Project
            </button>
          </div>

          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditResume;
