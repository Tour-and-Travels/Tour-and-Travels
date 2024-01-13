import React from "react";
import { Button, VStack, useMediaQuery } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PaymentOptions = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 400px)");
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tourIdFromURL = searchParams.get("tour_id");
  const hotelIdFromURL = searchParams.get("hotel_id");
  const amount = searchParams.get("amount");
  const numberOfPeople = searchParams.get("people");
  const selectedDate = searchParams.get("selectedDate");
  const rooms = searchParams.get("rooms");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone_no = searchParams.get("phone_no");
  const checkinDate = searchParams.get("checkinDate");
  const checkoutDate = searchParams.get("checkoutDate");
  const handlePayment = (method) => {
    console.log(`Payment via ${method}`);

    if (method === "debit card") {
      history.push(
        `/payment/debit-card?tour_id=${tourIdFromURL}&amount=${amount}&selectedDate=${selectedDate}&people=${numberOfPeople}&name=${name}&email=${email}&phone_no=${phone_no}&checkinDate=${checkinDate}&checkoutDate=${checkoutDate}&rooms=${rooms}&hotel_id=${hotelIdFromURL}`
      );
    } else if (method === "credit card") {
      history.push(
        `/payment/credit-card?tour_id=${tourIdFromURL}&amount=${amount}&selectedDate=${selectedDate}&people=${numberOfPeople}&name=${name}&email=${email}&phone_no=${phone_no}&checkinDate=${checkinDate}&checkoutDate=${checkoutDate}&rooms=${rooms}&hotel_id=${hotelIdFromURL}`
      );
    } else if (method === "UPI") {
      history.push(
        `/payment/upi?tour_id=${tourIdFromURL}&amount=${amount}&selectedDate=${selectedDate}&people=${numberOfPeople}&name=${name}&email=${email}&phone_no=${phone_no}&checkinDate=${checkinDate}&checkoutDate=${checkoutDate}&rooms=${rooms}&hotel_id=${hotelIdFromURL}`
      );
    }
  };

  return (
    <VStack spacing="4px" style={{ margin: "auto" }}>
      <Button
        bg="black"
        color="white"
        _hover={{
          boxShadow: "none",
          transition: "none",
        }}
        onClick={() => handlePayment("debit card")}
        fontSize={isSmallScreen ? "15px" : "18px"}
        width={isSmallScreen ? "85%" : "70%"}
      >
        Pay with Debit Card
      </Button>
      <Button
        bg="black"
        color="white"
        _hover={{
          boxShadow: "none",
          transition: "none",
        }}
        onClick={() => handlePayment("credit card")}
        fontSize={isSmallScreen ? "15px" : "18px"}
        width={isSmallScreen ? "85%" : "70%"}
      >
        Pay with Credit Card
      </Button>
      <Button
        bg="black"
        color="white"
        _hover={{
          boxShadow: "none",
          transition: "none",
        }}
        onClick={() => handlePayment("UPI")}
        fontSize={isSmallScreen ? "15px" : "18px"}
        width={isSmallScreen ? "85%" : "70%"}
      >
        Pay with UPI
      </Button>
    </VStack>
  );
};

export default PaymentOptions;
