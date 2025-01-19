import React, { useState } from "react";
import validator from "validator";
import "../styles/userInputFormStyle.css";
import axios from "axios";

export default function UserInputForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const resetInputs = () => {
    setFormData({ firstName: "", lastName: "", email: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function registerUser(data) {
    try {
      const response = await axios.post(
        "https://c1rbau5u35.execute-api.us-west-2.amazonaws.com/prod",
        data
      );
      console.log("Response data", response.data);
    } catch (e) {
      console.error("Error registering user: ", e);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    if (!validator.isEmail(email.value)) {
      console.error("Not a valid email");
      setErrorMsg("Email is invalid");
      return;
    }

    setErrorMsg("");
    console.log("Form Submitted: ", formData);

    await registerUser(formData);
    resetInputs();
  };

  return (
    <div id="form-container">
      <div id="header-div">
        <h1> AWS Citizen Registration</h1>
      </div>
      <div id="form-div">
        <form name="citizen-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <button
            type="submit"
            disabled={
              formData.firstName.length === 0 ||
              formData.lastName.length === 0 ||
              formData.email.length === 0
            }
          >
            Register
          </button>
        </form>
      </div>
      {errorMsg && <div>Error: {errorMsg}</div>}
    </div>
  );
}
