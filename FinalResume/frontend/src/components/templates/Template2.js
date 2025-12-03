/*
import React from "react";
import "../../css/template2.css";

const Template2 = ({ data, theme }) => {
  // Default fallback data
  const defaultData = {
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Smith",
    title: "Software Engineer",
    email: "janesmith@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",
    objective: "A passionate developer eager to contribute to innovative projects.",
    education: [
      { degree: "B.Sc. in Computer Science", institution: "XYZ University", year: "2020" },
    ],
    experience: "Frontend Developer at ABC Corp (2021–Present)",
    languageSkills: "English, Bengali",
    techSkills: "HTML, CSS, JavaScript, React, Node.js",
    softSkills: "Communication, Teamwork, Problem-solving",
    projects: [
      { title: "Portfolio Website", description: "Created a personal website using React." },
      { title: "Task Tracker", description: "Built a task management app with Node.js and MongoDB." },
    ],
    references: "Mr. Alex Smith – Manager, ABC Corp – alex.smith@abc.com",
  };

  const resumeData = { ...defaultData, ...data };

  return (
    <div
      className="template2"
      style={{ color: theme.primary, backgroundColor: theme.secondary, padding: "20px" }}
    >
      {/* Header }
      <header className="header">
        {resumeData.profilePic && (
          <img src={resumeData.profilePic} alt="Profile" className="profile-pic" />
        )}
        <div className="header-info">
          <h1 style={{ borderBottom: `2px solid ${theme.primary}` }}>{resumeData.name}</h1>
          <h3 style={{ color: theme.primary }}>{resumeData.title}</h3>
        </div>
      </header>

      {/* Main Body }
      <div className="body">
        {/* Left Column }
        <aside className="left-col">
          <section>
            <h2 style={{ color: theme.primary }}>Contact</h2>
            <p>{resumeData.email}</p>
            <p>{resumeData.phone}</p>
            <p>{resumeData.address}</p>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Technical Skills</h2>
            <ul>
              {resumeData.techSkills.split(",").map((skill, index) => (
                <li key={index} style={{ color: theme.primary }}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Soft Skills</h2>
            <ul>
              {resumeData.softSkills.split(",").map((skill, index) => (
                <li key={index} style={{ color: theme.primary }}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Languages</h2>
            <p>{resumeData.languageSkills}</p>
          </section>
        </aside>

        {/* Right Column }
        <main className="right-col">
          <section>
            <h2 style={{ color: theme.primary }}>Career Objective</h2>
            <p>{resumeData.objective}</p>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Experience</h2>
            <p>{resumeData.experience}</p>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Education</h2>
            <ul>
              {resumeData.education.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Projects</h2>
            <ul>
              {resumeData.projects.map((proj, index) => (
                <li key={index}>
                  <strong>{proj.title}</strong>: {proj.description}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>References</h2>
            <p>{resumeData.references}</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Template2;
*/
import React from "react";
import "../../css/template2.css";

const Template2 = ({ data, theme }) => {
  // Default fallback data
  const defaultData = {
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Smith",
    title: "Software Engineer",
    email: "janesmith@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",
    objective: "A passionate developer eager to contribute to innovative projects.",
    education: [
      { degree: "B.Sc. in Computer Science", institution: "XYZ University", year: "2020" },
    ],
    experience: [], // UPDATED to match Template1
    languageSkills: "English, Bengali",
    techSkills: "HTML, CSS, JavaScript, React, Node.js",
    softSkills: "Communication, Teamwork, Problem-solving",
    projects: [
      { title: "Portfolio Website", description: "Created a personal website using React." },
      { title: "Task Tracker", description: "Built a task management app with Node.js and MongoDB." },
    ],
    references: "Mr. Alex Smith – Manager, ABC Corp – alex.smith@abc.com",
  };

  // Safe merged data like Template1
  const resumeData = {
    ...defaultData,
    ...data,
    education: data?.education || defaultData.education,
    experience: data?.experience || defaultData.experience,
    projects: data?.projects || defaultData.projects,
  };

  // Safe theme fallback like Template1
  const safeTheme = {
    primary: theme?.primary || "#1a73e8",
    secondary: theme?.secondary || "#f5f7fa",
  };

  return (
    <div
      className="template2"
      style={{ color: safeTheme.primary, backgroundColor: safeTheme.secondary, padding: "20px" }}
    >
      {/* Header */}
      <header className="header">
        {resumeData.profilePic && (
          <img src={resumeData.profilePic} alt="Profile" className="profile-pic" />
        )}
        <div className="header-info">
          <h1 style={{ borderBottom: `2px solid ${safeTheme.primary}` }}>{resumeData.name}</h1>
          <h3 style={{ color: safeTheme.primary }}>{resumeData.title}</h3>
        </div>
      </header>

      {/* Main Body */}
      <div className="body">
        {/* Left Column */}
        <aside className="left-col">
          <section>
            <h2 style={{ color: safeTheme.primary }}>Contact</h2>
            <p>{resumeData.email}</p>
            <p>{resumeData.phone}</p>
            <p>{resumeData.address}</p>
          </section>

          <section>
            <h2 style={{ color: safeTheme.primary }}>Technical Skills</h2>
            <ul>
              {resumeData.techSkills.split(",").map((skill, index) => (
                <li key={index} style={{ color: safeTheme.primary }}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: safeTheme.primary }}>Soft Skills</h2>
            <ul>
              {resumeData.softSkills.split(",").map((skill, index) => (
                <li key={index} style={{ color: safeTheme.primary }}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: safeTheme.primary }}>Languages</h2>
            <p>{resumeData.languageSkills}</p>
          </section>
        </aside>

        {/* Right Column */}
        <main className="right-col">
          <section>
            <h2 style={{ color: safeTheme.primary }}>Career Objective</h2>
            <p>{resumeData.objective}</p>
          </section>

          {/* EXPERIENCE WITH ARRAY SUPPORT (same as Template1) */}
          <section>
            <h2 style={{ color: safeTheme.primary }}>Experience</h2>

            {Array.isArray(resumeData.experience) ? (
              <ul>
                {resumeData.experience.map((exp, index) => (
                  <li key={index}>
                    <strong>{exp.title}</strong> — {exp.company} ({exp.duration})
                    <br />
                    <em>{exp.description}</em>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{resumeData.experience}</p>
            )}
          </section>

          <section>
            <h2 style={{ color: safeTheme.primary }}>Education</h2>
            <ul>
              {resumeData.education.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: safeTheme.primary }}>Projects</h2>
            <ul>
              {resumeData.projects.map((proj, index) => (
                <li key={index}>
                  <strong>{proj.title}</strong>: {proj.description}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: safeTheme.primary }}>References</h2>
            <p>{resumeData.references}</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Template2;
