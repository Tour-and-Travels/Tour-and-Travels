import React from "react";
import { Button as ChakraButton, useMediaQuery } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

const GoBackButton = ({ onClick, children }) => {
  const history = useHistory();
  const [isSmallScreen] = useMediaQuery("(max-width: 400px)");

  const handleGoBack = () => {
    history.push("/");
  };

  return (
    <ChakraButton
      mb="1"
      ml="35%"
      bg="#1eff00a3"
      _hover={{
        boxShadow: "none",
        transition: "none",
      }}
      onClick={handleGoBack}
      fontSize={isSmallScreen ? "16px" : "18px"}
      width={isSmallScreen ? "50%" : "30%"}
      leftIcon={<ArrowBackIcon style={{ fontSize: "1.2em" }} />}
    >
      Go back
    </ChakraButton>
  );
};

export default GoBackButton;
