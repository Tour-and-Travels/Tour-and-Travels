import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useMediaQuery,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpiPayment = () => {
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
  const [upiDetails, setUpiDetails] = useState({
    selectedUpiApp: "",
    upiId: "",
    amount: amount || "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpiDetails({
      ...upiDetails,
      [name]: value,
    });
  };
  const [shouldRefresh, setShouldRefresh] = useState(false);
  useEffect(() => {
    if (shouldRefresh) {
      window.location.reload();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);
  const handleProceedToPay = () => {
    // Validate UPI details before proceeding to pay
    if (!upiDetails.selectedUpiApp || !upiDetails.upiId) {
      alert("Please fill in all the required UPI details.");
      return;
    }

    // Handle payment processing logic here
    console.log("Proceeding to pay via UPI with details:", upiDetails);

    // For demonstration purposes, redirect to a success page
    setIsOpen(true);
      console.log(tourIdFromURL);
      if(tourIdFromURL){
      fetch("/booking/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: JSON.parse(localStorage.getItem("userInfo")).user.user_id,
          tour_id: tourIdFromURL,
          amount: amount,
          people: numberOfPeople,
          booking_date: selectedDate,
          name: name,
          email: email,
          phone_no: phone_no,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
        })
        .catch((error) => {
          console.error("Error adding booking:", error);
        });
    }
    setTimeout(() => {
      setShouldRefresh(true);
      history.push(`/`);
    }, 1000);
  };

  return (
    <VStack spacing="4px">
      <FormControl id="selectedUpiApp" isRequired mb="3">
        <FormLabel>Select UPI App</FormLabel>
        <Select
          placeholder="Select UPI App"
          name="selectedUpiApp"
          value={upiDetails.selectedUpiApp}
          onChange={handleInputChange}
        >
          <option value="google-pay">Google Pay</option>
          <option value="phonepe">PhonePe</option>
          <option value="paytm">Paytm</option>
          {/* Add more UPI apps as needed */}
        </Select>
      </FormControl>

      <FormControl id="upiId" isRequired mb="3">
        <FormLabel>Enter UPI ID</FormLabel>
        <Input
          placeholder="Enter UPI ID"
          name="upiId"
          value={upiDetails.upiId}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="prepopulatedAmount" isRequired mb="3">
        <FormLabel>Amount</FormLabel>
        <Input
          placeholder="Amount"
          name="amount"
          value={upiDetails.amount}
          readOnly
        />
      </FormControl>

      <Button
        bg="black"
        color="white"
        _hover={{
          boxShadow: "none",
          transition: "none",
        }}
        onClick={handleProceedToPay}
        fontSize={isSmallScreen ? "15px" : "18px"}
        width={isSmallScreen ? "85%" : "70%"}
      >
        Proceed to Pay
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Payment Successful
            </AlertDialogHeader>

            <AlertDialogBody>Thank you for your payment. Please check your mail for the recipt</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default UpiPayment;
