/*import React from "react";
import "../../css/template3.css";

const Template3 = ({ data }) => {
  return (
    <div className="template3">
      <aside className="left">
        <div className="profile">
          <h1>{data.name || "Jane Smith"}</h1>
          <p>{data.title || "UX Designer"}</p>
        </div>
        <div className="contact">
          <h3>Contact</h3>
          <p>{data.email}</p>
          <p>{data.phone}</p>
        </div>
        <div className="skills">
          <h3>Skills</h3>
          <p>{data.skills}</p>
        </div>
      </aside>

      <main className="right">
        <section>
          <h2>About Me</h2>
          <p>{data.about}</p>
        </section>

        <section>
          <h2>Experience</h2>
          <p>{data.experience}</p>
        </section>

        <section>
          <h2>Education</h2>
          <p>{data.education}</p>
        </section>
      </main>
    </div>
  );
};

export default Template3;
*/
/*
import React from "react";
import "../../css/template3.css";

const Template3 = ({ data }) => {
  // Dummy/default data
  const defaultData = {
    profilePic: "https://via.placeholder.com/150", // Dummy profile picture
    name: "Jane Smith",
    title: "UX Designer",
    email: "janesmith@example.com",
    phone: "+123 456 7890",
    skills: "UI/UX Design, Figma, Adobe XD, HTML, CSS",
    about: "Creative UX designer passionate about crafting intuitive user experiences.",
    experience: "UX Designer at ABC Agency (2021-Present)",
    education: "B.Des in Interaction Design, XYZ University, 2020",
  };

  // Merge safely with user data
  const resumeData = {
    profilePic: data?.profilePic || defaultData.profilePic,
    name: data?.name || defaultData.name,
    title: data?.title || defaultData.title,
    email: data?.email || defaultData.email,
    phone: data?.phone || defaultData.phone,
    skills: data?.skills || defaultData.skills,
    about: data?.about || defaultData.about,
    experience: data?.experience || defaultData.experience,
    education: data?.education || defaultData.education,
  };

  return (
    <div className="template3">
      <aside className="left">
        <div className="profile">
          {resumeData.profilePic && (
            <img
              src={resumeData.profilePic}
              alt="Profile"
              className="profile-pic"
            />
          )}
          <h1>{resumeData.name}</h1>
          <p>{resumeData.title}</p>
        </div>

        <div className="contact">
          <h3>Contact</h3>
          <p>{resumeData.email}</p>
          <p>{resumeData.phone}</p>
        </div>

        <div className="skills">
          <h3>Skills</h3>
          <p>{resumeData.skills}</p>
        </div>
      </aside>

      <main className="right">
        <section>
          <h2>About Me</h2>
          <p>{resumeData.about}</p>
        </section>

        <section>
          <h2>Experience</h2>
          <p>{resumeData.experience}</p>
        </section>

        <section>
          <h2>Education</h2>
          <p>{resumeData.education}</p>
        </section>
      </main>
    </div>
  );
};

export default Template3;
*/
/* adding theme
import React from "react";
import "../../css/template3.css";

const Template3 = ({ data }) => {
  // Default fallback data
  const defaultData = {
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Smith",
    title: "UX Designer",
    email: "janesmith@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",
    objective: "Creative UX designer passionate about crafting user-centered experiences.",
    education: [
      { degree: "B.Des in Interaction Design", institution: "XYZ University", year: "2020" },
    ],
    experience: "UX Designer at ABC Agency (2021–Present)",
    languageSkills: "English, Bengali",
    techSkills: "UI/UX Design, Figma, Adobe XD, HTML, CSS",
    softSkills: "Creativity, Communication, Empathy, Problem Solving",
    projects: [
      { title: "Mobile App Redesign", description: "Redesigned an e-commerce app for better usability." },
      { title: "Portfolio Website", description: "Built a personal portfolio showcasing design projects." },
    ],
    references: "Mr. Alex Johnson – Senior Designer, ABC Agency – alex.johnson@abc.com",
  };

  // Merge safely with user data
  const resumeData = { ...defaultData, ...data };

  return (
    <div className="template3">
      {/* Left Sidebar }
      <aside className="left">
        <div className="profile">
          {resumeData.profilePic && (
            <img src={resumeData.profilePic} alt="Profile" className="profile-pic" />
          )}
          <h1>{resumeData.name}</h1>
          <p className="title">{resumeData.title}</p>
        </div>

        <div className="contact">
          <h3>Contact</h3>
          <p>{resumeData.email}</p>
          <p>{resumeData.phone}</p>
          <p>{resumeData.address}</p>
        </div>

        <div className="skills">
          <h3>Technical Skills</h3>
          <ul>
            {resumeData.techSkills.split(",").map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="skills">
          <h3>Soft Skills</h3>
          <ul>
            {resumeData.softSkills.split(",").map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="languages">
          <h3>Languages</h3>
          <p>{resumeData.languageSkills}</p>
        </div>
      </aside>

      {/* Right Main Content }
      <main className="right">
        <section>
          <h2>Career Objective</h2>
          <p>{resumeData.objective}</p>
        </section>

        <section>
          <h2>Experience</h2>
          <p>{resumeData.experience}</p>
        </section>

        <section>
          <h2>Education</h2>
          <ul>
            {resumeData.education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Projects</h2>
          <ul>
            {resumeData.projects.map((proj, index) => (
              <li key={index}>
                <strong>{proj.title}</strong>: {proj.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>References</h2>
          <p>{resumeData.references}</p>
        </section>
      </main>
    </div>
  );
};

export default Template3;
*/
/*
import React from "react";
import "../../css/template3.css";

const Template3 = ({ data, theme }) => {
  const defaultData = {
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Smith",
    title: "UX Designer",
    email: "janesmith@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",
    objective: "Creative UX designer passionate about crafting user-centered experiences.",
    education: [
      { degree: "B.Des in Interaction Design", institution: "XYZ University", year: "2020" },
    ],
    experience: "UX Designer at ABC Agency (2021–Present)",
    languageSkills: "English, Bengali",
    techSkills: "UI/UX Design, Figma, Adobe XD, HTML, CSS",
    softSkills: "Creativity, Communication, Empathy, Problem Solving",
    projects: [
      { title: "Mobile App Redesign", description: "Redesigned an e-commerce app for better usability." },
      { title: "Portfolio Website", description: "Built a personal portfolio showcasing design projects." },
    ],
    references: "Mr. Alex Johnson – Senior Designer, ABC Agency – alex.johnson@abc.com",
  };

  const resumeData = { ...defaultData, ...data };

  return (
    <div
      className="template3"
      style={{ color: theme.primary, backgroundColor: theme.secondary, padding: "20px" }}
    >
      {/* Left Sidebar }
      <aside className="left">
        <div className="profile">
          {resumeData.profilePic && (
            <img src={resumeData.profilePic} alt="Profile" className="profile-pic" />
          )}
          <h1 style={{ borderBottom: `2px solid ${theme.primary}` }}>{resumeData.name}</h1>
          <p className="title" style={{ color: theme.primary }}>{resumeData.title}</p>
        </div>

        <div className="contact">
          <h3 style={{ color: theme.primary }}>Contact</h3>
          <p>{resumeData.email}</p>
          <p>{resumeData.phone}</p>
          <p>{resumeData.address}</p>
        </div>

        <div className="skills">
          <h3 style={{ color: theme.primary }}>Technical Skills</h3>
          <ul>
            {resumeData.techSkills.split(",").map((skill, index) => (
              <li key={index} style={{ color: theme.primary }}>{skill.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="skills">
          <h3 style={{ color: theme.primary }}>Soft Skills</h3>
          <ul>
            {resumeData.softSkills.split(",").map((skill, index) => (
              <li key={index} style={{ color: theme.primary }}>{skill.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="languages">
          <h3 style={{ color: theme.primary }}>Languages</h3>
          <p>{resumeData.languageSkills}</p>
        </div>
      </aside>

      {/* Right Main Content }
      <main className="right">
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
  );
};

export default Template3;
*/
import React from "react";
import "../../css/template3.css";

const Template3 = ({ data, theme }) => {
  // Default fallback data
  const defaultData = {
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Smith",
    title: "UX Designer",
    email: "janesmith@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",
    objective: "Creative UX designer passionate about crafting user-centered experiences.",
    education: [
      { degree: "B.Des in Interaction Design", institution: "XYZ University", year: "2020" },
    ],
    experience: [], // changed to array
    languageSkills: "English, Bengali",
    techSkills: "UI/UX Design, Figma, Adobe XD, HTML, CSS",
    softSkills: "Creativity, Communication, Empathy, Problem Solving",
    projects: [
      { title: "Mobile App Redesign", description: "Redesigned an e-commerce app for better usability." },
      { title: "Portfolio Website", description: "Built a personal portfolio showcasing design projects." },
    ],
    references: "Mr. Alex Johnson – Senior Designer, ABC Agency – alex.johnson@abc.com",
  };

  // Merge backend data safely
  const resumeData = {
    ...defaultData,
    ...data,
    education: data?.education || defaultData.education,
    projects: data?.projects || defaultData.projects,
    experience: Array.isArray(data?.experience)
      ? data.experience
      : data?.experience
      ? [{ title: data.experience }]
      : defaultData.experience,
  };

  // Safe fallback theme
  const safeTheme = {
    primary: theme?.primary || "#1a73e8",
    secondary: theme?.secondary || "#f5f7fa",
  };

  return (
    <div
      className="template3"
      style={{
        color: safeTheme.primary,
        backgroundColor: safeTheme.secondary,
        padding: "20px",
      }}
    >
      {/* Left Sidebar */}
      <aside className="left">
        <div className="profile">
          {resumeData.profilePic && (
            <img src={resumeData.profilePic} alt="Profile" className="profile-pic" />
          )}
          <h1 style={{ borderBottom: `2px solid ${safeTheme.primary}` }}>{resumeData.name}</h1>
          <p className="title" style={{ color: safeTheme.primary }}>{resumeData.title}</p>
        </div>

        <div className="contact">
          <h3 style={{ color: safeTheme.primary }}>Contact</h3>
          <p>{resumeData.email}</p>
          <p>{resumeData.phone}</p>
          <p>{resumeData.address}</p>
        </div>

        <div className="skills">
          <h3 style={{ color: safeTheme.primary }}>Technical Skills</h3>
          <ul>
            {resumeData.techSkills.split(",").map((skill, index) => (
              <li key={index} style={{ color: safeTheme.primary }}>{skill.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="skills">
          <h3 style={{ color: safeTheme.primary }}>Soft Skills</h3>
          <ul>
            {resumeData.softSkills.split(",").map((skill, index) => (
              <li key={index} style={{ color: safeTheme.primary }}>{skill.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="languages">
          <h3 style={{ color: safeTheme.primary }}>Languages</h3>
          <p>{resumeData.languageSkills}</p>
        </div>
      </aside>

      {/* Right Main Content */}
      <main className="right">
        <section>
          <h2 style={{ color: safeTheme.primary }}>Career Objective</h2>
          <p>{resumeData.objective}</p>
        </section>

        <section>
          <h2 style={{ color: safeTheme.primary }}>Experience</h2>

          {Array.isArray(resumeData.experience) ? (
            <ul>
              {resumeData.experience.map((exp, index) => (
                <li key={index}>
                  <strong>{exp.title}</strong>
                  {exp.company && ` — ${exp.company}`}
                  {exp.duration && ` (${exp.duration})`}
                  <br />
                  {exp.description && <em>{exp.description}</em>}
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
  );
};

export default Template3;
