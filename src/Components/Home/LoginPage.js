import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../Authentication/Login.js";
import Signup from "../Authentication/Signup.js";
import { useHistory } from "react-router-dom";
const LoginPage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user);
    if (user) history.push("/");
  }, [history]);

  return (
    <div style={{ width: "100%", height: "900px" }}>
      <Container
        maxW="2xl"
        centerContent
        style={{
          width: "50%",
          height: "100%",
          marginLeft: "25%",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          p="4"
          bg="white"
          w="100%"
          m="10px 0 10px 0"
          borderRadius="10px"
          borderWidth="1px"
          boxShadow="outline"
        >
          <Text
            // fontFamily="Libre Baskerville"
            fontSize="2xl"
            textAlign="center"
          >
            Tour and Travels
          </Text>
        </Box>
        <Box
          width="100%"
          bg="white"
          p="4"
          borderRadius="8px"
          borderWidth="1px"
          borderColor="black"
          boxShadow="outline"
        >
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList mb="10px">
              <Tab width="50%" fontFamily="Libre Baskerville">
                Login
              </Tab>
              <Tab width="50%" fontFamily="Libre Baskerville">
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};
export default LoginPage;
