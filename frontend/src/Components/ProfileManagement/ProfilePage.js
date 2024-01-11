import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProfileContent from "./ProfileContent.js";
const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [history]);
  if (!user) {
    return null;
  }
  return <ProfileContent />;
};

export default ProfilePage;
