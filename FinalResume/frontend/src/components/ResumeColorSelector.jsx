import React, { useState } from "react";
import { colorThemes } from "../data/colorThemes";

const ResumeColorSelector = ({ setTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState(colorThemes[0]);
  const [customColor, setCustomColor] = useState("");

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setTheme(theme);
  };

  const handleCustomColor = (e) => {
    const color = e.target.value;
    setCustomColor(color);
    setTheme({ primary: color, secondary: "#FFFFFF" });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Select a Color Theme:</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {colorThemes.map((theme) => (
          <div
            key={theme.name}
            onClick={() => handleThemeChange(theme)}
            style={{
              backgroundColor: theme.primary,
              width: "40px",
              height: "40px",
              borderRadius: "5px",
              cursor: "pointer",
              border: selectedTheme.name === theme.name ? "3px solid black" : "none",
            }}
            title={theme.name}
          ></div>
        ))}
      </div>

      <h3>Or Enter Custom Color:</h3>
      <input type="color" value={customColor} onChange={handleCustomColor} />
    </div>
  );
};

export default ResumeColorSelector;
