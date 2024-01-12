import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
  useMediaQuery,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateBooking = () => {
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    return phoneNumber.length === 10;
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookingIdFromURL = searchParams.get("booking_id");
  const tourIdFromURL = searchParams.get("tour_id");
  const [isSmallScreen] = useMediaQuery("(max-width: 400px)");
  const [booking_id, setBookingId] = useState(bookingIdFromURL);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone_no, setPhoneNo] = useState();
  const [numOfPeople, setNumOfPeople] = useState();
  const [booking_date, setBookingDate] = useState();
  const [maximum_occupancy, setMaximumoccupancy] = useState();
  const [Starting_date, setStartingDate] = useState();
  const [Ending_date, setEndingDate] = useState();
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [debitCardNumber, setDebitCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePaymentSuccess = () => {
    // Add logic to handle successful payment
    toast({
      title: "Payment Successful",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Continue with the booking update logic if needed
    updateBooking();
    setShowPaymentForm(false);
    setLoading(false);
  };
  const updateBooking = async () => {
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const formData = {
        name,
        email,
        phone_no,
        numOfPeople,
        booking_date,
        amount, // Update the amount to newAmount
        // ... (other form data)
      };

      const { data } = await axios.put(
        `/booking/update/${booking_id}`,
        formData,
        config
      );

      toast({
        title: "Booking updated successfully",
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
    setLoading(false);
  };
  const fetchBooking = (bookingId) => {
    fetch(`/booking/specificread/${bookingId}`)
      .then((response) => response.json())
      .then((data) => {
        setBooking(data.booking);
        setName(data.booking.name);
        setEmail(data.booking.email);
        setPhoneNo(data.booking.phone_no);
        setNumOfPeople(data.booking.people);
        const selectedDate = new Date(data.booking.booking_date)
          .toISOString()
          .split("T")[0];
        setBookingDate(selectedDate);
        setAmount(data.booking.amount);
        console.log(data.booking);
      })
      .catch((error) => console.error("Error fetching booked tours:", error));
  };
  const fetchTourDetails = async () => {
    try {
      const response = await fetch(`/tour/specificread/${tourIdFromURL}`);
      if (response.ok) {
        const data = await response.json();
        const tour = data.tour;
        setMaximumoccupancy(tour.maximum_occupancy);
        setStartingDate(tour.Starting_date);
        setEndingDate(tour.Ending_date);
        setPrice(tour.Price);
        console.log(tour);
      } else {
        throw new Error("Failed to fetch tour details");
      }
    } catch (error) {
      console.error("Error fetching tour details:", error);
    }
  };

  useEffect(() => {
    if (bookingIdFromURL) {
      fetchBooking(bookingIdFromURL);
    } else {
      console.error("Booking information not available");
    }
  }, []);
  useEffect(() => {
    if (tourIdFromURL) {
      fetchTourDetails(tourIdFromURL);
    } else {
      console.error("Tour information not available");
    }
  }, []);
  const handleReset = () => {
    fetchBooking(bookingIdFromURL);
    if (booking) {
      setName(booking.name);
      setEmail(booking.email);
      setPhoneNo(booking.phone_no);
      setNumOfPeople(booking.people);
      setBookingDate(booking.booking_date.split("T")[0]);
      setAmount(booking.amount);
      console.log(booking.name);
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    const formData = {
      name,
      email,
      phone_no,
      numOfPeople,
      booking_date,
      amount,
    };
    if (
      name === "" ||
      email === "" ||
      phone_no === "" ||
      numOfPeople === "" ||
      booking_date === ""
    ) {
      toast({
        title: "Error",
        description: "Please fill in all the required fields correctly.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (!isPhoneNumberValid(phone_no)) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number with 10 digits.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (numOfPeople > maximum_occupancy) {
      toast({
        title: "Error",
        description: `Number of people exceeds maximum occupancy (${maximum_occupancy}).`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (numOfPeople <= 0) {
      toast({
        title: "Error",
        description: `Number of people should be greater than 0.`,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    const startDate = new Date(Starting_date);
    const endDate = new Date(Ending_date);
    console.log(startDate);
    console.log(endDate);
    console.log(booking_date);
    const selectedBookingDate = new Date(booking_date);
    if (selectedBookingDate < startDate || selectedBookingDate > endDate) {
      toast({
        title: "Error",
        description: "Selected date is not within the tour date range.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    const newAmount = price * numOfPeople;
    if (newAmount > amount) {
      const additionalPayment = newAmount - amount;
      toast({
        description: `You have to pay ₹${additionalPayment}.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setShowPaymentForm(true);
      setLoading(false);
      setAmount(newAmount);
      return;
    }
    if (newAmount < amount) {
      console.log(newAmount);
      const additionalPayment = amount - newAmount;
      toast({
        description: `You will be refunded ₹${additionalPayment}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setAmount(newAmount);
    updateBooking();
    setLoading(false);
  };
  return (
    <>
      <VStack spacing="2px" mb="1">
        <FormControl id="booking-id">
          <HStack spacing="2">
            <FormLabel>Booking ID</FormLabel>
            <Input value={bookingIdFromURL} width="500px" isDisabled />
          </HStack>
        </FormControl>

        <FormControl id="tour-id">
          <HStack spacing="2">
            <FormLabel>Tour ID</FormLabel>
            <Input value={tourIdFromURL} width="500px" isDisabled />
          </HStack>
        </FormControl>

        <FormControl id="name" borderColor="black">
          <HStack spacing="2">
            <FormLabel>Name</FormLabel>
            <Input
              value={name}
              width="500px"
              onChange={(event) => setName(event.target.value)}
            />
          </HStack>
        </FormControl>

        <FormControl id="email" borderColor="black">
          <HStack spacing="2">
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              width="500px"
              onChange={(event) => setEmail(event.target.value)}
            />
          </HStack>
        </FormControl>

        <FormControl id="phone-no" borderColor="black">
          <HStack spacing="2">
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              value={phone_no}
              width="400px"
              onChange={(event) => setPhoneNo(event.target.value)}
            />
          </HStack>
        </FormControl>

        <FormControl id="num-of-people" borderColor="black">
          <HStack spacing="2">
            <FormLabel>Number of People</FormLabel>
            <Input
              type="number"
              value={numOfPeople}
              width="400px"
              onChange={(event) => setNumOfPeople(event.target.value)}
            />
          </HStack>
        </FormControl>

        <FormControl id="check-in-date" borderColor="black">
          <HStack spacing="2">
            <FormLabel>Check-in Date</FormLabel>
            <Input
              type="date"
              value={booking_date}
              width="400px"
              onChange={(event) => setBookingDate(event.target.value)}
            />
          </HStack>
        </FormControl>
        <FormControl id="amount" borderColor="black">
          <HStack spacing="2">
            <FormLabel>Amount paid: {"\u20B9"}</FormLabel>
            <Input
              type="number"
              value={amount}
              width="400px"
              isDisabled
              onChange={(event) => setBookingDate(event.target.value)}
            />
          </HStack>
        </FormControl>
      </VStack>
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
      {showPaymentForm && (
        <Modal
          isOpen={showPaymentForm}
          onClose={() => setShowPaymentForm(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Debit Card Payment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Debit card form */}
              <FormControl id="debit-card-number">
                <FormLabel>Debit Card Number</FormLabel>
                <Input
                  type="text"
                  value={debitCardNumber}
                  onChange={(e) => setDebitCardNumber(e.target.value)}
                />
              </FormControl>
              <FormControl id="expiry-date">
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </FormControl>
              <FormControl id="cvv">
                <FormLabel>CVV</FormLabel>
                <Input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handlePaymentSuccess}>
                Confirm Payment
              </Button>
              <Button onClick={() => setShowPaymentForm(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default UpdateBooking;
