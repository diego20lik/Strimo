import React, { useEffect } from "react";
import firebase from "../../utils/firebase";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
function Content({ info }) {
  return (
    <>
      {info.map((doc, i) => {
        return (
          <>
            {doc.pago?
            <a href={`/ticket/${doc.pago}`}>
              <p>{doc.info}</p>
              <hr />
            </a>
            :
            <>
              <p>{doc.info}</p>
              <hr />
            </>
            }
          </>
        );
      })}
      {info.length > 1 && (
        <div className="nav-item">
          <a href="/" className="ver-mas nav-link">
            <h4>Ver mas</h4>
          </a>
        </div>
      )}
    </>
  );
}

export default Content;
