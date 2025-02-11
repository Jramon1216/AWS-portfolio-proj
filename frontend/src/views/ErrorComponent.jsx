import React, { useContext } from "react";
import "../styles/errorComponentStyle.css";
import { ErrorContext } from "../context/ErrorContext";

export default function ErrorComponent() {
  const { errorCode, errorMsg, hideError } =
    useContext(ErrorContext);

  if (!errorMsg) return null;

  return (
    <div id="error-div">
      {errorCode ? (
        <h3 id="error-header">Error: {errorCode} </h3>
      ) : (
        <h3 id="error-header">Error</h3>
      )}
      <p id="error-explination" style={{ marginTop: "5px" }}>
        {errorMsg}
      </p>
    </div>
  );
}
