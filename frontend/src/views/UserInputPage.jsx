import React from "react";
import UserInputForm from "./UserInputFormComponent";
import ErrorComponent from "./ErrorComponent";

export default function UserInputPage() {
    return (
      <div id="user-input-div">
        <UserInputForm />
        <ErrorComponent />
      </div>
    );
}