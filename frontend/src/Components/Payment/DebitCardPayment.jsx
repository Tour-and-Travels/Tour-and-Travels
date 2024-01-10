import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
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
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const DebitCardPayment = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 400px)");
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const tourIdFromURL = searchParams.get("tour_id");
  const amount = searchParams.get("amount");
  const numberOfPeople = searchParams.get("people");
  const selectedDate = searchParams.get("selectedDate");
  const [debitCardDetails, setDebitCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    Name: "",
    amount: amount || "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const onClose = () => {
    setIsOpen(false);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDebitCardDetails({
      ...debitCardDetails,
      [name]: value,
    });
  };

  const handleProceedToPay = () => {
    // Basic validation checks
    if (
      !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(debitCardDetails.cardNumber) ||
      !/^\d{3}$/.test(debitCardDetails.cvv) ||
      !/^\d{2}\/\d{4}$/.test(debitCardDetails.expiryDate)
    ) {
      setError("Please enter the details correctly.");
      return;
    }

    // Handle payment processing logic here
    console.log(
      "Proceeding to pay via Debit Card with details:",
      debitCardDetails
    );

    // For demonstration purposes, show a success notification
    setIsOpen(true);
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
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error adding booking:", error);
      });
    setTimeout(() => {
      history.push(`/payment-success?tour_id=${tourIdFromURL}`);
    }, 1000);
  };

  return (
    <VStack spacing="4px">
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <FormControl id="cardNumber" isRequired mb="3">
        <FormLabel>Card Number</FormLabel>
        <Input
          placeholder="Enter Card Number"
          name="cardNumber"
          value={debitCardDetails.cardNumber}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="expiryDate" isRequired mb="3">
        <FormLabel>Expiry Date (MM/YYYY)</FormLabel>
        <Input
          placeholder="Enter Expiry Date"
          name="expiryDate"
          value={debitCardDetails.expiryDate}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="cvv" isRequired mb="3">
        <FormLabel>CVV</FormLabel>
        <Input
          placeholder="Enter CVV"
          name="cvv"
          value={debitCardDetails.cvv}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="Name" isRequired mb="3">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Name"
          name="Name"
          value={debitCardDetails.Name}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="prepopulatedAmount" isRequired mb="3">
        <FormLabel>Amount</FormLabel>
        <Input
          placeholder="Amount"
          name="amount"
          value={debitCardDetails.amount}
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
        Proceed to Payment
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={undefined}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Payment Successful
            </AlertDialogHeader>

            <AlertDialogBody>Thank you for your payment!</AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="green" onClick={onClose} ml={3}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};

export default DebitCardPayment;
