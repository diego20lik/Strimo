import React, { useState, useEffect } from "react";
import "../../styles/waves.css";
function WavesLight({ children }) {
  return (
    <>
      <div className="olas">
        <div className="wavel-1"></div>
        <div className="wavel-2"></div>
      </div>
      <div className="wave-content-w">{children}</div>
      <div className="olas voltear">
        <div className="wavel-1"></div>
        <div className="wavel-2"></div>
      </div>
    </>
  );
}

export default WavesLight;
