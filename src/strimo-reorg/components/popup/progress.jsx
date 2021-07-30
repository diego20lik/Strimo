import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/progress.css";
function Err({ message, setMessage }) {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [message]);
  return (
    <>
      {open && (
        <div className="overlay-progress" id="overlay">
          <div
            className="popup-err"
            onClick={(e) => e.stopPropagation()}
            id="popup"
          >
            <h1>{message}%</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default Err;
