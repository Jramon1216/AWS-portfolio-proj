import React from "react";
import UserInputForm from "./UserInputFormComponent";
import ErrorComponent from "./ErrorComponent";
import { ErrorProvider } from "../context/ErrorContext";

export default function UserInputPage() {
    return (
      <>
      <ErrorProvider>
        <UserInputForm />
        <ErrorComponent />
      </ErrorProvider>
      </>
    );
}