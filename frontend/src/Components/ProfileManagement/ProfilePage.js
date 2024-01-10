import React, { useState } from "react";
import "./ProfilePage.css"; // You can style your ProfilePage here
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, useMediaQuery } from "@chakra-ui/react";
const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("********");
  const [phone, setPhone] = useState("1234567890");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 400px)");
  const submitHandler = async () => {};
  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set the image to display in the circular avatar
      setImage(reader.result);
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
      // Here, you can make an API call to upload the image file to the server
      // Example: Use fetch or Axios to send the image file to the backend
    }
  };

  // Function to handle name update
  const handleNameChange = (e) => {
    const newName = e.target.value;
    // Update the name state
    setName(newName);
    // Here, you can make an API call to update the name in the backend
  };

  // Function to handle password update
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    // Update the password state
    setPassword(newPassword);
    // Here, you can make an API call to update the password in the backend
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 style={{ fontSize: "1.6em" }}>Profile</h1>
      </div>
      <div className="avatar-container">
        <label htmlFor="avatar-upload" className="avatar">
          <img
            src={
              image
                ? image
                : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            }
            alt="Profile Avatar"
            className="avatar-image"
          />
          <div className="camera-icon">
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              onChange={handleFileChange}
            />
            <FontAwesomeIcon icon={faCamera} />
          </div>
        </label>
      </div>
      <div className="profile-details">
        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label>Email:</label>
          <input type="email" value={email} disabled className="input-field" />
        </div>
        <div className="input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label>Phone:</label>
          <input type="tel" value={phone} disabled className="input-field" />
        </div>
        <Button
          mb="1"
          ml="35%"
          bg="#1eff00a3"
          _hover={{
            boxShadow: "none",
            transition: "none",
          }}
          fontSize={isSmallScreen ? "16px" : "18px"}
          width={isSmallScreen ? "50%" : "30%"}
          onClick={submitHandler}
          isLoading={loading}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
