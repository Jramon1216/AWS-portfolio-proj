import React from "react";
import "../styles/errorComponentStyle.css"

export default function ErrorComponent(error) {
    return (
      <div id="error-div">
          <h3 id="error-header">Error - 404</h3>
          <p id="error-explination" style={{"margin-top": "2px"}}>Error registering user</p>
      </div>
    );
}
