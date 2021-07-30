import React, { useState, useEffect } from "react";
import "./waves.css";
function WavesDark({ children }) {
  return (
    <>
      <div className="olas">
        <div className="waved-1"></div>
        <div className="waved-2"></div>
        <div className="waved-3"></div>
      </div>
      <div className="wave-content-container-d">{children}</div>
      <div className="olas voltear">
        <div className="waved-1"></div>
        <div className="waved-2"></div>
        <div className="waved-3"></div>
      </div>
    </>
  );
}

export default WavesDark;
