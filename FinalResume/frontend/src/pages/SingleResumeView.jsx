/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";

const SingleResumeView = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/resume/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResume(data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    fetchResume();
  }, [id, token]);

  const renderTemplate = () => {
    if (!resume) return null;

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
    <div style={{ padding: "20px", background: "#f9f9f9", minHeight: "100vh" }}>
      {resume ? (
        <>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{resume.name}'s Resume</h2>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "10px" }}>
            {renderTemplate()}
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>Loading resume...</p>
      )}
    </div>
  );
};

export default SingleResumeView;
*/
/*
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa";
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";

const SingleResumeView = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  const resumeRef = useRef();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/resume/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(data)
        setResume(data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };
    fetchResume();
  }, [id, token]);

  const renderTemplate = () => {
    if (!resume) return null;
    switch (resume.template) {
      case "Template1":
        return <Template1 data={resume} theme={{ primary: "#1a73e8", secondary: "#f5f7fa" }} />;
      case "Template2":
        return <Template2 data={resume} theme={{ primary: "#673ab7", secondary: "#faf7ff" }} />;
      default:
        return <Template1 data={resume} theme={{ primary: "#1a73e8", secondary: "#f5f7fa" }} />;
    }
  };

  // ✅ Full-page PDF export fix
  const handleDownload = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add multiple pages if needed
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${resume.name}_Resume.pdf`);
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f3f6fb",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {resume ? (
        <>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#222",
              fontSize: "26px",
              fontWeight: "700",
            }}
          >
            {resume.name}'s Resume
          </h2>

          {/* Modern Download Button }
          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <button
              onClick={handleDownload}
              style={{
                background: "#1a73e8",
                color: "#fff",
                border: "none",
                padding: "12px 25px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#155ab6";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#1a73e8";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <FaDownload /> Download Resume
            </button>
          </div>

          {/* Resume Section *}
          <div
            ref={resumeRef}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              width: "50%",
              margin: "0 auto",
            }}
          >
            {renderTemplate()}
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#444" }}>Loading resume...</p>
      )}
    </div>
  );
};

export default SingleResumeView;
*/
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaDownload } from "react-icons/fa";
import Template1 from "../components/templates/Template1";
import Template2 from "../components/templates/Template2";
import Template3 from "../components/templates/Template3";
import Template4 from "../components/templates/Template4";

const SingleResumeView = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;
  const resumeRef = useRef();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/resume/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResume(data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };
    fetchResume();
  }, [id, token]);

  const renderTemplate = () => {
    if (!resume) return null;

    const templateMap = {
      "1": Template1,
      "2": Template2,
      "3": Template3,
      "4": Template4,
    };

    const TemplateComp = templateMap[resume.template];
    if (!TemplateComp) return <p style={{ fontSize: "14px", color: "gray" }}>No template selected</p>;

    const themeMap = {
      "1": { primary: "#1a73e8", secondary: "#f5f7fa" },
      "2": { primary: "#673ab7", secondary: "#faf7ff" },
      "3": { primary: "#ff6f00", secondary: "#fff7e6" },
      "4": { primary: "#00695c", secondary: "#e0f2f1" },
    };

    return <TemplateComp data={resume} theme={themeMap[resume.template]} />;
  };

  const handleDownload = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${resume.name}_Resume.pdf`);
  };

  return (
    <div style={{ padding: "30px", background: "#f3f6fb", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {resume ? (
        <>
          <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#222", fontSize: "26px", fontWeight: "700" }}>
            {resume.name}'s Resume
          </h2>

          <div style={{ textAlign: "center", marginBottom: "25px" }}>
            <button
              onClick={handleDownload}
              style={{
                background: "#1a73e8",
                color: "#fff",
                border: "none",
                padding: "12px 25px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#155ab6";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#1a73e8";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <FaDownload /> Download Resume
            </button>
          </div>

          <div
            ref={resumeRef}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              width: "50%",
              margin: "0 auto",
            }}
          >
            {renderTemplate()}
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#444" }}>Loading resume...</p>
      )}
    </div>
  );
};

export default SingleResumeView;
