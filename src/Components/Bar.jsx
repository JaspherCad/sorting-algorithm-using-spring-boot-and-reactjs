import React from "react";

const Bar = ({ value, height, color }) => {
  return (
    <div style={{ position: "relative", display: "inline-block", margin: "0 1px" }}>
      <div
        style={{
          width: "10px",
          height: `${height}px`,
          backgroundColor: color,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          fontSize: "12px",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default Bar;
