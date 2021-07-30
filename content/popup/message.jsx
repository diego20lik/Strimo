import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./err.css";
function Err({ message, setMessage }) {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [message]);
  const closePopUp = () => {
    setOpen(false);
    setMessage("")
  };
  return (
    <>
      {open && (
        <div className="overlay-err" onClick={() => closePopUp()} id="overlay">
            <div
                className="popup-err"
                onClick={(e) => e.stopPropagation()}
                id="popup"
            >
                {message}
            </div>
        </div>
      )}
    </>
  );
}

export default Err;
