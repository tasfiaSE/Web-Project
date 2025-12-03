/*import React from "react";
import "../../css/template4.css";

const Template4 = ({ data }) => {
  return (
    <div className="template4">
      <header className="t4-header">
        <div className="photo"></div>
        <div>
          <h1>{data.name || "Richard Sanchez"}</h1>
          <h3>{data.title || "Marketing Manager"}</h3>
        </div>
      </header>

      <div className="t4-body">
        <aside className="t4-left">
          <section>
            <h2>Contact</h2>
            <p>{data.email}</p>
            <p>{data.phone}</p>
          </section>

          <section>
            <h2>Skills</h2>
            <p>{data.skills}</p>
          </section>
        </aside>

        <main className="t4-right">
          <section>
            <h2>Profile</h2>
            <p>{data.about}</p>
          </section>

          <section>
            <h2>Work Experience</h2>
            <p>{data.experience}</p>
          </section>

          <section>
            <h2>Education</h2>
            <p>{data.education}</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Template4;
*/
/* adding new things
import React from "react";
import "../../css/template4.css";

const Template4 = ({ data }) => {
  // Dummy/default data
  const defaultData = {
    profilePic: "https://via.placeholder.com/150", // Dummy profile picture
    name: "Richard Sanchez",
    title: "Marketing Manager",
    email: "richards@example.com",
    phone: "+123 456 7890",
    skills: "SEO, Content Marketing, Social Media, Google Analytics",
    about: "Marketing professional with 5+ years of experience in digital marketing and strategy.",
    experience: "Marketing Manager at ABC Corp (2020-Present)",
    education: "MBA in Marketing, XYZ University, 2018",
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
    <div className="template4">
      <header className="t4-header">
        {resumeData.profilePic && (
          <img
            src={resumeData.profilePic}
            alt="Profile"
            className="t4-photo"
          />
        )}
        <div>
          <h1>{resumeData.name}</h1>
          <h3>{resumeData.title}</h3>
        </div>
      </header>

      <div className="t4-body">
        <aside className="t4-left">
          <section>
            <h2>Contact</h2>
            <p>{resumeData.email}</p>
            <p>{resumeData.phone}</p>
          </section>

          <section>
            <h2>Skills</h2>
            <p>{resumeData.skills}</p>
          </section>
        </aside>

        <main className="t4-right">
          <section>
            <h2>Profile</h2>
            <p>{resumeData.about}</p>
          </section>

          <section>
            <h2>Work Experience</h2>
            <p>{resumeData.experience}</p>
          </section>

          <section>
            <h2>Education</h2>
            <p>{resumeData.education}</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Template4;
*/
/* adding theme
import React from "react";
import "../../css/template4.css";

const Template4 = ({ data }) => {
  const defaultData = {
    profilePic: "https://via.placeholder.com/150",
    name: "Richard Sanchez",
    title: "Marketing Manager",
    email: "richards@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",
    about: "Marketing professional with 5+ years of experience in digital marketing and strategy.",
    education: [
      { degree: "MBA in Marketing", institution: "XYZ University", year: "2018" },
    ],
    experience: [
      { position: "Marketing Manager", company: "ABC Corp", year: "2020–Present" },
    ],
    techSkills: "SEO, Content Marketing, Google Analytics",
    softSkills: "Leadership, Teamwork, Communication",
    languages: "English, Bengali",
    projects: [
      { title: "Brand Campaign", description: "Led a campaign increasing reach by 40%." },
    ],
    references: [
      { name: "John Doe", position: "Director, ABC Corp", contact: "john@example.com" },
    ],
  };

  const resumeData = { ...defaultData, ...data };

  const ensureArray = (field) => {
    if (Array.isArray(field)) return field;
    if (typeof field === "string") return [{ text: field }];
    return [];
  };

  const expList = ensureArray(resumeData.experience);
  const eduList = ensureArray(resumeData.education);
  const projList = ensureArray(resumeData.projects);
  const refList = ensureArray(resumeData.references);

  return (
    <div className="template4 modern-template">
      <header className="t4-header">
        {resumeData.profilePic && (
          <img src={resumeData.profilePic} alt="Profile" className="t4-photo" />
        )}
        <div className="t4-header-info">
          <h1>{resumeData.name}</h1>
          <h3>{resumeData.title}</h3>
          <p>{resumeData.email} | {resumeData.phone}</p>
          <p>{resumeData.address}</p>
        </div>
      </header>

      <div className="t4-body">
        <aside className="t4-left">
          <section>
            <h2>About Me</h2>
            <p>{resumeData.about}</p>
          </section>

          <section>
            <h2>Technical Skills</h2>
            <ul>
              {resumeData.techSkills.split(",").map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Soft Skills</h2>
            <ul>
              {resumeData.softSkills.split(",").map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Languages</h2>
            <p>{resumeData.languages}</p>
          </section>
        </aside>

        <main className="t4-right">
          <section>
            <h2>Work Experience</h2>
            <ul>
              {expList.map((exp, i) => (
                <li key={i}>
                  {exp.position ? (
                    <>
                      <strong>{exp.position}</strong> — {exp.company} ({exp.year})
                    </>
                  ) : (
                    exp.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Education</h2>
            <ul>
              {eduList.map((edu, i) => (
                <li key={i}>
                  {edu.degree ? (
                    <>
                      <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
                    </>
                  ) : (
                    edu.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Projects</h2>
            <ul>
              {projList.map((proj, i) => (
                <li key={i}>
                  {proj.title ? (
                    <>
                      <strong>{proj.title}</strong>: {proj.description}
                    </>
                  ) : (
                    proj.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>References</h2>
            <ul>
              {refList.map((ref, i) => (
                <li key={i}>
                  {ref.name ? (
                    <>
                      <strong>{ref.name}</strong> — {ref.position} <br />
                      <span>{ref.contact}</span>
                    </>
                  ) : (
                    ref.text
                  )}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Template4;
*/
/*
import React from "react";
import "../../css/template4.css";

const Template4 = ({ data, theme }) => {
  const defaultData = {
    profilePic: "https://via.placeholder.com/150",
    name: "Richard Sanchez",
    title: "Marketing Manager",
    email: "richards@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",
    about: "Marketing professional with 5+ years of experience in digital marketing and strategy.",
    education: [
      { degree: "MBA in Marketing", institution: "XYZ University", year: "2018" },
    ],
    experience: [
      { position: "Marketing Manager", company: "ABC Corp", year: "2020–Present" },
    ],
    techSkills: "SEO, Content Marketing, Google Analytics",
    softSkills: "Leadership, Teamwork, Communication",
    languages: "English, Bengali",
    projects: [
      { title: "Brand Campaign", description: "Led a campaign increasing reach by 40%." },
    ],
    references: [
      { name: "John Doe", position: "Director, ABC Corp", contact: "john@example.com" },
    ],
  };

  const resumeData = { ...defaultData, ...data };

  const ensureArray = (field) => {
    if (Array.isArray(field)) return field;
    if (typeof field === "string") return [{ text: field }];
    return [];
  };

  const expList = ensureArray(resumeData.experience);
  const eduList = ensureArray(resumeData.education);
  const projList = ensureArray(resumeData.projects);
  const refList = ensureArray(resumeData.references);

  return (
    <div
      className="template4 modern-template"
      style={{ color: theme.primary, backgroundColor: theme.secondary, padding: "20px" }}
    >
      <header className="t4-header">
        {resumeData.profilePic && (
          <img src={resumeData.profilePic} alt="Profile" className="t4-photo" />
        )}
        <div className="t4-header-info">
          <h1 style={{ borderBottom: `2px solid ${theme.primary}` }}>{resumeData.name}</h1>
          <h3 style={{ color: theme.primary }}>{resumeData.title}</h3>
          <p>{resumeData.email} | {resumeData.phone}</p>
          <p>{resumeData.address}</p>
        </div>
      </header>

      <div className="t4-body">
        <aside className="t4-left">
          <section>
            <h2 style={{ color: theme.primary }}>About Me</h2>
            <p>{resumeData.about}</p>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Technical Skills</h2>
            <ul>
              {resumeData.techSkills.split(",").map((skill, i) => (
                <li key={i} style={{ color: theme.primary }}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Soft Skills</h2>
            <ul>
              {resumeData.softSkills.split(",").map((skill, i) => (
                <li key={i} style={{ color: theme.primary }}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Languages</h2>
            <p>{resumeData.languages}</p>
          </section>
        </aside>

        <main className="t4-right">
          <section>
            <h2 style={{ color: theme.primary }}>Work Experience</h2>
            <ul>
              {expList.map((exp, i) => (
                <li key={i}>
                  {exp.position ? (
                    <>
                      <strong>{exp.position}</strong> — {exp.company} ({exp.year})
                    </>
                  ) : (
                    exp.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Education</h2>
            <ul>
              {eduList.map((edu, i) => (
                <li key={i}>
                  {edu.degree ? (
                    <>
                      <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
                    </>
                  ) : (
                    edu.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Projects</h2>
            <ul>
              {projList.map((proj, i) => (
                <li key={i}>
                  {proj.title ? (
                    <>
                      <strong>{proj.title}</strong>: {proj.description}
                    </>
                  ) : (
                    proj.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>References</h2>
            <ul>
              {refList.map((ref, i) => (
                <li key={i}>
                  {ref.name ? (
                    <>
                      <strong>{ref.name}</strong> — {ref.position} <br />
                      <span>{ref.contact}</span>
                    </>
                  ) : (
                    ref.text
                  )}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Template4;
*/

import React from "react";
import "../../css/template4.css";

const Template4 = ({ data, theme }) => {
  const defaultData = {
    profilePic: "https://via.placeholder.com/150",
    name: "Richard Sanchez",
    title: "Marketing Manager",
    email: "richards@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",

    about: "Marketing professional with 5+ years of experience in digital marketing and strategy.",

    education: [
      { degree: "MBA in Marketing", institution: "XYZ University", year: "2018" },
    ],

    // Updated to Template 1 Style
    experience: [
      {
        title: "Marketing Manager",
        company: "ABC Corp",
        duration: "2020–Present",
        description: "Leading digital marketing campaigns and strategy development."
      }
    ],

    techSkills: "SEO, Content Marketing, Google Analytics",
    softSkills: "Leadership, Teamwork, Communication",
    languages: "English, Bengali",

    projects: [
      { title: "Brand Campaign", description: "Led a campaign increasing reach by 40%." },
    ],

    references: [
      { name: "John Doe", position: "Director, ABC Corp", contact: "john@example.com" },
    ],
  };

  const resumeData = { ...defaultData, ...data };

  const ensureArray = (field) => {
    if (Array.isArray(field)) return field;
    if (typeof field === "string") return [{ text: field }];
    return [];
  };

  const expList = ensureArray(resumeData.experience);
  const eduList = ensureArray(resumeData.education);
  const projList = ensureArray(resumeData.projects);
  const refList = ensureArray(resumeData.references);

  return (
    <div
      className="template4 modern-template"
      style={{ color: theme.primary, backgroundColor: theme.secondary, padding: "20px" }}
    >
      {/* HEADER */}
      <header className="t4-header">
        {resumeData.profilePic && (
          <img src={resumeData.profilePic} alt="Profile" className="t4-photo" />
        )}

        <div className="t4-header-info">
          <h1 style={{ borderBottom: `2px solid ${theme.primary}` }}>
            {resumeData.name}
          </h1>
          <h3 style={{ color: theme.primary }}>{resumeData.title}</h3>
          <p>{resumeData.email} | {resumeData.phone}</p>
          <p>{resumeData.address}</p>
        </div>
      </header>

      <div className="t4-body">
        {/* LEFT SIDEBAR */}
        <aside className="t4-left">

          <section>
            <h2 style={{ color: theme.primary }}>About Me</h2>
            <p>{resumeData.about}</p>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Technical Skills</h2>
            <ul>
              {resumeData.techSkills.split(",").map((skill, i) => (
                <li key={i} style={{ color: theme.primary }}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Soft Skills</h2>
            <ul>
              {resumeData.softSkills.split(",").map((skill, i) => (
                <li key={i} style={{ color: theme.primary }}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ color: theme.primary }}>Languages</h2>
            <p>{resumeData.languages}</p>
          </section>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="t4-right">

          {/* EXPERIENCE (Template 1 Style) */}
          <section>
            <h2 style={{ color: theme.primary }}>Work Experience</h2>
            <ul>
              {expList.map((exp, i) => (
                <li key={i}>
                  {exp.title ? (
                    <>
                      <strong>{exp.title}</strong> — {exp.company} ({exp.duration})
                      <p>{exp.description}</p>
                    </>
                  ) : (
                    exp.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 style={{ color: theme.primary }}>Education</h2>
            <ul>
              {eduList.map((edu, i) => (
                <li key={i}>
                  {edu.degree ? (
                    <>
                      <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
                    </>
                  ) : (
                    edu.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* PROJECTS */}
          <section>
            <h2 style={{ color: theme.primary }}>Projects</h2>
            <ul>
              {projList.map((proj, i) => (
                <li key={i}>
                  {proj.title ? (
                    <>
                      <strong>{proj.title}</strong>: {proj.description}
                    </>
                  ) : (
                    proj.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* REFERENCES */}
          <section>
            <h2 style={{ color: theme.primary }}>References</h2>
            <ul>
              {refList.map((ref, i) => (
                <li key={i}>
                  {ref.name ? (
                    <>
                      <strong>{ref.name}</strong> — {ref.position} <br />
                      <span>{ref.contact}</span>
                    </>
                  ) : (
                    ref.text
                  )}
                </li>
              ))}
            </ul>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Template4;
