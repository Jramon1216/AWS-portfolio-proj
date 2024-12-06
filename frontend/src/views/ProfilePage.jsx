import React from "react";
import "../styles/profilePageStyle.css";
import defaultAvatar from "../assets/img/default-avatar.png"

export default function ProfilePage() {
  return (
    <>
      <div id="profile">
        <div id="left">
            <img src={defaultAvatar} />
            <p>UID: 12345</p>
        </div>
        <div id="right">
          <p>First Name: John</p>
          <p>Last Name: Smith</p>
          <p>Email: Jsmith@email.com</p>
        </div>
      </div>
    </>
  );
}
