import React, { useEffect } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import GoBackButton from "../Home/GoBackButton.js";
import UpdateBooking from "./UpdateBooking.js";
const UpdateBookingPage = () => {
  return (
    <div style={{ width: "100%", height: "900px" }}>
      <Container
        maxW="2xl"
        centerContent
        style={{
          width: "50%",
          height: "100%",
          margin: "2px auto",
        }}
      >
        <Text fontSize="2xl" textAlign="center" mb="10px">
          Update Tour Booking
        </Text>
        <Box
          width="100%"
          bg="white"
          p="4"
          borderRadius="8px"
          borderWidth="1px"
          borderColor="black"
          boxShadow="outline"
        >
          <UpdateBooking />
          <GoBackButton />
        </Box>
      </Container>
    </div>
  );
};
export default UpdateBookingPage;
