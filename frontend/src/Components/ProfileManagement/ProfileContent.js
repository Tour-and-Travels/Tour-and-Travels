import React, { useState } from "react";
import "./ProfilePage.css";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const ProfileContent = () => {
  const user = JSON.parse(localStorage.getItem("userInfo")).user;
  const arrayBufferToBase64 = (buffer) => {
    const binary = Array.from(new Uint8Array(buffer))
      .map((byte) => String.fromCharCode(byte))
      .join("");
    return btoa(binary);
  };
  const imageUrl = `data:image/jpeg;base64,${arrayBufferToBase64(
    user.image.data
  )}`;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone_no, setPhone_no] = useState(user.phone_no);
  const [image, setImage] = useState(imageUrl);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const toast = useToast();
  const [isSmallScreen] = useMediaQuery("(max-width: 400px)");
  const handleClick = () => setShow(!show);
  const validatePasswordLength = (password) => {
    const minLength = 8;
    return password.length >= minLength;
  };
  const validatePasswordCharacter = (password) => {
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    return specialCharacterRegex.test(password);
  };
  const isPhoneNumberValid = (phoneNumber) => {
    return phoneNumber.length === 10;
  };
  const handleClickPasswordChange = () => {
    setShowPasswordFields(!showPasswordFields);
  };
  const handleReset = () => {
    setName(user.name);
    setEmail(user.email);
    setPhone_no(user.phone_no);
    setImage(imageUrl);
    setPassword("");
    setConfirmPassword("");
    setShowPasswordFields(false);
  };
  const submitHandler = async () => {
    setLoading(true);
    if (name.trim() === "") {
      toast({
        title: "Please enter a valid name",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (!isPhoneNumberValid(phone_no)) {
      toast({
        title: "Phone no digits should have only 10 digits",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const userData = { name, email, phone_no };
      if (password && confirmPassword) {
        if (!validatePasswordLength(password)) {
          toast({
            title: "Password Should Be Atleast 8 Characters Long",
            status: "warning",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
        if (!validatePasswordCharacter(password)) {
          toast({
            title: "Password Should Contain Atleast One Special Character",
            status: "warning",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
        userData.password = password;
      }
      const userId = user.user_id;
      const { data } = await axios.put(
        `/auth/userupdate/${userId}`,
        userData,
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setShowPasswordFields(false);
      toast({
        title: "Update is successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Some Error Occurred!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
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
        </label>
      </div>
      <div className="profile-details">
        <div className="input-container">
          <label>Name:</label>
          <InputGroup borderColor="black">
            <Input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input-field"
            />
          </InputGroup>
        </div>
        <div className="input-container">
          <label>Email:</label>
          <InputGroup borderColor="black">
            <Input
              type="email"
              value={email}
              disabled
              className="input-field"
            />
          </InputGroup>
        </div>
        {showPasswordFields ? (
          <>
            <div className="input-container">
              <label>Enter New Password:</label>
              <InputGroup borderColor="black">
                <Input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="input-field"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={show ? "Hide Password" : "Show Password"}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handleClick}
                    bg="transparent"
                    _hover={{
                      boxShadow: "none",
                      transition: "none",
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </div>
            <div className="input-container">
              <label>Confirm Password:</label>
              <InputGroup borderColor="black">
                <Input
                  type={show ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="input-field"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={show ? "Hide Password" : "Show Password"}
                    icon={show ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={handleClick}
                    bg="transparent"
                    _hover={{
                      boxShadow: "none",
                      transition: "none",
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </div>
          </>
        ) : (
          <Button
            mb="1"
            bg="violet"
            _hover={{
              boxShadow: "none",
              transition: "none",
            }}
            fontSize={isSmallScreen ? "10px" : "18px"}
            width={isSmallScreen ? "60%" : "70%"}
            onClick={handleClickPasswordChange}
          >
            Change Password
          </Button>
        )}
        <div className="input-container">
          <label>Phone:</label>
          <InputGroup borderColor="black">
            <Input
              type="tel"
              value={phone_no}
              onChange={(event) => setPhone_no(event.target.value)}
              className="input-field"
            />
          </InputGroup>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            mb="1"
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
          <Button
            mb="1"
            bg="#ff0000"
            _hover={{
              boxShadow: "none",
              transition: "none",
            }}
            fontSize={isSmallScreen ? "16px" : "18px"}
            width={isSmallScreen ? "50%" : "30%"}
            onClick={handleReset}
            isLoading={loading}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
