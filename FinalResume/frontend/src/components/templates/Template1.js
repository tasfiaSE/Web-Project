
import React from "react";
import "../../css/template1.css";

const Template1 = ({ data, theme }) => {
  // Default fallback data
  const defaultData = {
    profilePic: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",
    objective: "A motivated professional seeking opportunities to grow and contribute.",
    education: [
      { degree: "B.Sc. in Computer Science", institution: "XYZ University", year: "2020" },
    ],
    experience: [],

    languageSkills: "English, Bengali",
    techSkills: "HTML, CSS, JavaScript, React, Node.js",
    softSkills: "Communication, Teamwork, Problem-solving",
    projects: [
      { title: "Portfolio Website", description: "Developed a personal portfolio using React." },
    ],
    references: "Mr. Alex Smith – Manager, ABC Corp – alex.smith@abc.com",
  };

  // Merge safely
  const resumeData = {
  ...defaultData,
  ...data,
  experience: data?.experience || defaultData.experience,
  education: data?.education || defaultData.education,
  projects: data?.projects || defaultData.projects,
};

  // Add safe fallback theme colors
  const safeTheme = {
    primary: theme?.primary || "#1a73e8",
    secondary: theme?.secondary || "#f5f7fa",
  };

  return (
    <div
      className="resume-template template1"
      style={{
        color: safeTheme.primary,
        backgroundColor: safeTheme.secondary,
        padding: "20px",
      }}
    >
      {/* Header Section */}
      <div className="header">
        {resumeData.profilePic && (
          <img src={resumeData.profilePic} alt="Profile" className="profile-pic" />
        )}
        <div className="header-info">
          <h1 className="name" style={{ borderBottom: `2px solid ${safeTheme.primary}` }}>
            {resumeData.name}
          </h1>
          <p className="contact">
            {resumeData.email} | {resumeData.phone}
          </p>
          <p className="contact">{resumeData.address}</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="divider" style={{ borderColor: safeTheme.primary }} />

      {/* Objective */}
      <div className="section">
        <h2 style={{ color: safeTheme.primary }}>Career Objective</h2>
        <p>{resumeData.objective}</p>
      </div>

      {/* Education */}
      <div className="section">
        <h2 style={{ color: safeTheme.primary }}>Education</h2>
        <ul>
          {resumeData.education.map((edu, index) => (
            <li key={index}>
              <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
            </li>
          ))}
        </ul>
      </div>

      {/* Experience */}
      <div className="section">
       <h2 style={{ color: safeTheme.primary }}>Experience</h2>
      <ul>
         {Array.isArray(resumeData.experience) ? (
          resumeData.experience.map((exp, index) => (
          <li key={index}>
          <strong>{exp.title}</strong> — {exp.company} ({exp.duration})
          <br />
          <em>{exp.description}</em>
        </li>
      ))
    ) : (
      <p>{resumeData.experience}</p> // fallback if old resumes use string
    )}
  </ul>
</div>

      {/* Technical Skills */}
      <div className="section">
        <h2 style={{ color: safeTheme.primary }}>Technical Skills</h2>
        <div className="skills">
          {resumeData.techSkills.split(",").map((skill, index) => (
            <span
              key={index}
              className="skill-badge"
              style={{ backgroundColor: safeTheme.primary, color: "#fff" }}
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="section">
        <h2 style={{ color: safeTheme.primary }}>Soft Skills</h2>
        <div className="skills">
          {resumeData.softSkills.split(",").map((skill, index) => (
            <span
              key={index}
              className="skill-badge soft"
              style={{ backgroundColor: safeTheme.primary, color: "#fff" }}
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="section">
        <h2 style={{ color: safeTheme.primary }}>Languages</h2>
        <p>{resumeData.languageSkills}</p>
      </div>

      {/* Projects */}
      <div className="section">
        <h2 style={{ color: safeTheme.primary }}>Projects</h2>
        <ul>
          {resumeData.projects.map((proj, index) => (
            <li key={index}>
              <strong>{proj.title}</strong>: {proj.description}
            </li>
          ))}
        </ul>
      </div>

      {/* References */}
      <div className="section">
        <h2 style={{ color: safeTheme.primary }}>References</h2>
        <p>{resumeData.references}</p>
      </div>
    </div>
  );
};

export default Template1;
