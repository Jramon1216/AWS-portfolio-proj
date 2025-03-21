import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/profilePageStyle.css";
import defaultAvatar from "../assets/img/default-avatar.png";
import axios from "axios";

export default function ProfilePage() {
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState(null);
  const userID = searchParams.get("userID");
  const apiUrlGetUser = process.env.REACT_APP_API_GATEWAY_URL_GETUSER; 

  useEffect(() => {
    if (userID) {
      axios
        .get(
          {apiUrlGetUser}
        )
        .then((response) => setUserData(response.data))
        .catch(error=> console.error("Error fetching user data: ", error));
    }
  }, [userID]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div id="profile">
        <div id="left">
          <img src={defaultAvatar} alt="User avatar"/>
          <p>UID: {userData['data'].userID}</p>
        </div>
        <div id="right">
          <p>First Name: {userData['data'].firstName}</p>
          <p>Last Name: {userData['data'].lastName}</p>
          <p>Email: {userData['data'].email}</p>
        </div>
      </div>
    </>
  );
}
