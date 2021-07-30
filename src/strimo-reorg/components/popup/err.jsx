import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/err.css";
function Err({ message, setErr }) {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [message]);
  const closePopUp = () => {
    setOpen(false);
    setErr("");
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
            <h3 className="titulo-err">Error</h3>
            <hr />
            {message}
          </div>
        </div>
      )}
    </>
  );
}

export default Err;
