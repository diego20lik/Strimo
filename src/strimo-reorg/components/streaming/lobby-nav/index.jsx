import React from "react";
import "../../../styles/lobby-nav.css";
function Nav() {
  return (
    <div className="lobby-nav">
      <h5>
        <b>Nav</b>
      </h5>
      <div className="search-lobby">
        <input type="text" placeholder="Search" />
        <button className="primario">Search</button>
      </div>
    </div>
  );
}

export default Nav;
