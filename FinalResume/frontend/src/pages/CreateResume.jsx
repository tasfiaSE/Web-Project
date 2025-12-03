/*
import React, { useState } from "react";
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";
import ResumeColorSelector from "../components/ResumeColorSelector"; // new import

import axios from "axios";
import "../css/createresume.css";

const templates = [Template1, Template2, Template3, Template4];

const CreateResume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  //const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  const [objectiveSuggestions, setObjectiveSuggestions] = useState([]);
  const [experienceSuggestions, setExperienceSuggestions] = useState([]);
  const [projectSuggestions, setProjectSuggestions] = useState([]);

  const [theme, setTheme] = useState({ primary: "#4169E1", secondary: "#F0F8FF" });
  //<ResumeColorSelector setTheme={setTheme} />

  const [formData, setFormData] = useState({
    name: "",
    profilePic: "",
    title: "",
    email: "",
    linkedin: "",
    phone: "",
    address: "",
    objective: "",
    education: [
      { degree: "", institution: "", year: "" },
      { degree: "", institution: "", year: "" },
      { degree: "", institution: "", year: "" },
    ],
    languageSkills: "",
    techSkills: "",
    softSkills: "",
    experience: [
  { jobTitle: "", company: "", duration: "", description: "" }
],

    projects: [
      { title: "", description: "" },
      { title: "", description: "" },
    ],
    references: "",
  });
 
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token; // ✅ টোকেন পাওয়া গেল

  // 🔹 Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle profile picture upload (limit 5MB)
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("❌ Profile picture must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔹 Handle Education change
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({ ...formData, education: newEducation });
  };

  // 🔹 Handle Projects change
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  // Handle Experience
const handleExperienceChange = (field, value) => {
  const newExp = [...formData.experience];
  
  // map frontend fields to backend schema
  if (field === "jobTitle") newExp[0].title = value;
  else if (field === "company") newExp[0].company = value;
  else if (field === "duration") newExp[0].duration = value;
  else if (field === "description") newExp[0].description = value;
  
  setFormData({ ...formData, experience: newExp });
};



const checkGrammar = async (text, setState) => {
  if (!text.trim()) return;

  try {
    const response = await fetch("https://resume-backend-ynv6.onrender.com/api/grammar/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    const cleaned = data.matches.map((m) => ({
      message: m.message,
      replacement: m.replacements?.[0]?.value || "",
    }));

    setState(cleaned);
  } catch (err) {
    console.error("Grammar error:", err);
  }
};



  // 🔹 Save Resume to MongoDB
  const handleSave = async () => {
  try {
    if (!token) {
      alert("❌ You are not logged in. Please log in first.");
      return;
    }
    
    
    // Prepare payload
    const payload = {
        ...formData,
        experience: formData.experience.map(exp => ({
        title: exp.title || "",
        company: exp.company || "",
        duration: exp.duration || "",
        description: exp.description || ""
    })),
        projects: formData.projects,
};

    // 🔹 Add console log here to check payload
    console.log("Payload to send:", payload);

    // Send to backend
    const response = await axios.post(
      "https://resume-backend-ynv6.onrender.com/api/resume/save",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Saved resume:", response.data);
    alert("✅ Resume saved successfully!");
  } catch (error) {
    console.error(
      "Error saving resume:",
      error.response?.data || error.message
    );
    alert("❌ Failed to save resume. Check console for details.");
  }
};

    

  const SelectedTemplate = templates[selectedTemplate];

  return (
    <div className="create-resume-page">
      <h1 className="page-title">Create Your Resume</h1>

      {/* Template Selector }
      <div className="template-selector">
        {templates.map((_, i) => (
          <button
            key={i}
            className={`template-btn ${selectedTemplate === i ? "active" : ""}`}
            onClick={() => setSelectedTemplate(i)}
          >
            Template {i + 1}
          </button>
        ))}
      </div>

      <div className="resume-builder">
        {/* Left Form Section }
        <div className="resume-form">
           
          <ResumeColorSelector setTheme={setTheme} />

          <h2>Personal Info</h2>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} />
          <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          <input
  name="linkedin"
  placeholder="LinkedIn Profile URL"
  value={formData.linkedin}
  onChange={(e) => {
    let val = e.target.value;
    if (val && !val.startsWith("http")) {
      val = "https://" + val;
    }
    setFormData({ ...formData, linkedin: val });
  }}
/>

          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

          {/* Profile Picture Upload }
          <div className="profile-upload">
            <label>Upload Profile Picture (Max 5MB)</label>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            {formData.profilePic && (
              <img src={formData.profilePic} alt="Profile Preview" className="profile-preview" />
            )}
          </div>

          <h2>Objective</h2>
          <textarea
            name="objective"
            placeholder="Write your career objective..."
            value={formData.objective}
            onChange={handleChange}
          />
          <button
  type="button"
  className="check-btn"
  onClick={() => checkGrammar(formData.objective, setObjectiveSuggestions)}
>
  Check Objective Grammar
</button>

{objectiveSuggestions.length > 0 && (
  <div className="grammar-results">
    {objectiveSuggestions.map((s, i) => (
      <p key={i}>❌ {s.message} → ✔ {s.replacement}</p>
    ))}
  </div>
)}


          <h2>Education</h2>
          <table className="education-table">
            <thead>
              <tr>
                <th>Degree</th>
                <th>Institution</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {formData.education.map((edu, index) => (
                <tr key={index}>
                  <td>
                    <input
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      placeholder="e.g. B.Sc. in CSE"
                    />
                  </td>
                  <td>
                    <input
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                      placeholder="University Name"
                    />
                  </td>
                  <td>
                    <input
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                      placeholder="Year"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Skills</h2>
          <textarea
            name="languageSkills"
            placeholder="Language Skills (e.g., English, Bengali)"
            value={formData.languageSkills}
            onChange={handleChange}
          />
          <textarea
            name="techSkills"
            placeholder="Technical Skills (e.g., Python, React, MongoDB)"
            value={formData.techSkills}
            onChange={handleChange}
          />
          <textarea
            name="softSkills"
            placeholder="Soft Skills (e.g., Communication, Teamwork)"
            value={formData.softSkills}
            onChange={handleChange}
          />

          <h2>Experience</h2>
<input
  placeholder="Job Title"
  value={formData.experience[0].title}
  onChange={(e) => handleExperienceChange("jobTitle", e.target.value)}
/>
<input
  placeholder="Company"
  value={formData.experience[0].company}
  onChange={(e) => handleExperienceChange("company", e.target.value)}
/>
<input
  placeholder="Duration (e.g., 2 years)"
  value={formData.experience[0].duration}
  onChange={(e) => handleExperienceChange("duration", e.target.value)}
/>
<textarea
  placeholder="Description"
  value={formData.experience[0].description}
  onChange={(e) => handleExperienceChange("description", e.target.value)}
/>

          <button
  type="button"
  className="check-btn"
  onClick={() => checkGrammar(formData.experience, setExperienceSuggestions)}
>
  Check Experience Grammar
</button>

{experienceSuggestions.length > 0 && (
  <div className="grammar-results">
    {experienceSuggestions.map((s, i) => (
      <p key={i}>❌ {s.message} → ✔ {s.replacement}</p>
    ))}
  </div>
)}


          <h2>Projects</h2>
          {formData.projects.map((proj, index) => (
            <div key={index} className="project-entry">
              <input
                type="text"
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => handleProjectChange(index, "title", e.target.value)}
              />
              <textarea
                placeholder="Project Description (2–3 lines)"
                value={proj.description}
                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
              />
              <button
  type="button"
  className="check-btn"
  onClick={() => checkGrammar(proj.description, setProjectSuggestions)}
>
  Check Project Grammar
</button>

{projectSuggestions.length > 0 && (
  <div className="grammar-results">
    {projectSuggestions.map((s, i) => (
      <p key={i}>❌ {s.message} → ✔ {s.replacement}</p>
    ))}
  </div>
)}

            </div>
          ))}
          <h2>References</h2>
              <textarea
  name="references"
  placeholder="e.g., Mr. John Smith – Manager..."
  value={formData.references}
  onChange={handleChange}
  style={{ whiteSpace: "pre-wrap" }}
/>

          

          <div className="button-group">
            
            <button className="action-btn" onClick={handleSave}>
              Save Resume
            </button>
          </div>
        </div>

        {/* Right Preview Section }
        <div className="resume-preview">
          <SelectedTemplate data={formData} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
*/
import React, { useState } from "react";
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";
import ResumeColorSelector from "../components/ResumeColorSelector";

import axios from "axios";
import "../css/createresume.css";

const templates = [Template1, Template2, Template3, Template4];

const CreateResume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [objectiveSuggestions, setObjectiveSuggestions] = useState([]);
  const [experienceSuggestions, setExperienceSuggestions] = useState([]);
  const [projectSuggestions, setProjectSuggestions] = useState([]);
  const [theme, setTheme] = useState({ primary: "#4169E1", secondary: "#F0F8FF" });

  const [formData, setFormData] = useState({
    name: "",
    profilePic: "",
    title: "",
    email: "",
    linkedin: "",
    phone: "",
    address: "",
    objective: "",
    education: [
      { degree: "", institution: "", year: "" },
      { degree: "", institution: "", year: "" },
      { degree: "", institution: "", year: "" },
    ],
    languageSkills: "",
    techSkills: "",
    softSkills: "",
    experience: [
      { title: "", company: "", duration: "", description: "" } // <-- backend-compatible
    ],
    projects: [
      { title: "", description: "" },
      { title: "", description: "" },
    ],
    references: "",
    template: "",
  });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  // Handle generic input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle profile picture
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("❌ Profile picture must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Education change
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({ ...formData, education: newEducation });
  };

  // Projects change
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  // Experience change
  const handleExperienceChange = (field, value) => {
    const newExp = [...formData.experience];
    if (field === "jobTitle") newExp[0].title = value;
    else if (field === "company") newExp[0].company = value;
    else if (field === "duration") newExp[0].duration = value;
    else if (field === "description") newExp[0].description = value;
    setFormData({ ...formData, experience: newExp });
  };

  // Grammar check function
  const checkGrammar = async (text, setState) => {
    if (!text.trim()) return;
    try {
      const response = await fetch("https://resume-backend-ynv6.onrender.com/api/grammar/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      const cleaned = data.matches.map((m) => ({
        message: m.message,
        replacement: m.replacements?.[0]?.value || "",
      }));
      setState(cleaned);
    } catch (err) {
      console.error("Grammar error:", err);
    }
  };

  // Save resume
  const handleSave = async () => {
    try {
      if (!token) {
        alert("❌ You are not logged in. Please log in first.");
        return;
      }

      const payload = {
        ...formData,
        experience: formData.experience.map(exp => ({
          title: exp.title || "",
          company: exp.company || "",
          duration: exp.duration || "",
          description: exp.description || ""
        })),
        projects: formData.projects,
      };

      console.log("Payload to send:", payload);

      const response = await axios.post(
        "http://localhost:5000/api/resume/save",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Saved resume:", response.data);
      alert("✅ Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error.response?.data || error.message);
      alert("❌ Failed to save resume. Check console for details.");
    }
  };

  const SelectedTemplate = templates[selectedTemplate];

  return (
    <div className="create-resume-page">
      <h1 className="page-title">Create Your Resume</h1>

      {/* Template Selector */}
      <div className="template-selector">
  {templates.map((_, i) => (
    <button
      key={i}
      className={`template-btn ${selectedTemplate === i ? "active" : ""}`}
      onClick={() => {
        setSelectedTemplate(i);
        setFormData(prev => ({ ...prev, template: String(i + 1) })); // Save selected template
      }}
    >
      Template {i + 1}
    </button>
  ))}
</div>

      <div className="resume-builder">
        {/* Left Form Section */}
        <div className="resume-form">
          <ResumeColorSelector setTheme={setTheme} />

          <h2>Personal Info</h2>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} />
          <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          <input
            name="linkedin"
            placeholder="LinkedIn Profile URL"
            value={formData.linkedin}
            onChange={(e) => {
              let val = e.target.value;
              if (val && !val.startsWith("http")) val = "https://" + val;
              setFormData({ ...formData, linkedin: val });
            }}
          />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

          {/* Profile Picture */}
          <div className="profile-upload">
            <label>Upload Profile Picture (Max 5MB)</label>
            <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            {formData.profilePic && <img src={formData.profilePic} alt="Profile Preview" className="profile-preview" />}
          </div>

          <h2>Objective</h2>
          <textarea name="objective" placeholder="Write your career objective..." value={formData.objective} onChange={handleChange} />
          <button type="button" className="check-btn" onClick={() => checkGrammar(formData.objective, setObjectiveSuggestions)}>
            Check Objective Grammar
          </button>
          {objectiveSuggestions.length > 0 && (
            <div className="grammar-results">
              {objectiveSuggestions.map((s, i) => (<p key={i}>❌ {s.message} → ✔ {s.replacement}</p>))}
            </div>
          )}

          <h2>Education</h2>
          <table className="education-table">
            <thead>
              <tr>
                <th>Degree</th>
                <th>Institution</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {formData.education.map((edu, index) => (
                <tr key={index}>
                  <td><input value={edu.degree} onChange={(e) => handleEducationChange(index, "degree", e.target.value)} placeholder="e.g. B.Sc. in CSE" /></td>
                  <td><input value={edu.institution} onChange={(e) => handleEducationChange(index, "institution", e.target.value)} placeholder="University Name" /></td>
                  <td><input value={edu.year} onChange={(e) => handleEducationChange(index, "year", e.target.value)} placeholder="Year" /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Skills</h2>
          <textarea name="languageSkills" placeholder="Language Skills" value={formData.languageSkills} onChange={handleChange} />
          <textarea name="techSkills" placeholder="Technical Skills" value={formData.techSkills} onChange={handleChange} />
          <textarea name="softSkills" placeholder="Soft Skills" value={formData.softSkills} onChange={handleChange} />

          <h2>Experience</h2>
          <input placeholder="Job Title" value={formData.experience[0].title} onChange={(e) => handleExperienceChange("jobTitle", e.target.value)} />
          <input placeholder="Company" value={formData.experience[0].company} onChange={(e) => handleExperienceChange("company", e.target.value)} />
          <input placeholder="Duration" value={formData.experience[0].duration} onChange={(e) => handleExperienceChange("duration", e.target.value)} />
          <textarea placeholder="Description" value={formData.experience[0].description} onChange={(e) => handleExperienceChange("description", e.target.value)} />

          <button
            type="button"
            className="check-btn"
            onClick={() =>
              checkGrammar(
                `${formData.experience[0].title} ${formData.experience[0].company} ${formData.experience[0].duration} ${formData.experience[0].description}`,
                setExperienceSuggestions
              )
            }
          >
            Check Experience Grammar
          </button>

          {experienceSuggestions.length > 0 && (
            <div className="grammar-results">
              {experienceSuggestions.map((s, i) => (<p key={i}>❌ {s.message} → ✔ {s.replacement}</p>))}
            </div>
          )}

          <h2>Projects</h2>
          {formData.projects.map((proj, index) => (
            <div key={index} className="project-entry">
              <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => handleProjectChange(index, "title", e.target.value)} />
              <textarea placeholder="Project Description" value={proj.description} onChange={(e) => handleProjectChange(index, "description", e.target.value)} />
              <button type="button" className="check-btn" onClick={() => checkGrammar(proj.description, setProjectSuggestions)}>Check Project Grammar</button>
              {projectSuggestions.length > 0 && (
                <div className="grammar-results">
                  {projectSuggestions.map((s, i) => (<p key={i}>❌ {s.message} → ✔ {s.replacement}</p>))}
                </div>
              )}
            </div>
          ))}

          <h2>References</h2>
          <textarea name="references" placeholder="References" value={formData.references} onChange={handleChange} style={{ whiteSpace: "pre-wrap" }} />

          <div className="button-group">
            <button className="action-btn" onClick={handleSave}>Save Resume</button>
          </div>
        </div>

        {/* Right Preview */}
        <div className="resume-preview">
          <SelectedTemplate data={formData} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default CreateResume;
