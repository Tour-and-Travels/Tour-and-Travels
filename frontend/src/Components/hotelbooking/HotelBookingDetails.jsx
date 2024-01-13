// BookingDetails.jsx
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import PaymentPage from "../Payment/PaymentPage";
import { useLocation } from "react-router-dom";

const HotelBookingDetails = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 400px)");
  const history = useHistory();
  const location = useLocation();
  const toast = useToast();

  // Retrieve hotel_id from the URL
  const searchParams = new URLSearchParams(location.search);
  const hotelIdFromURL = searchParams.get("hotel_id");
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    discount: "",
    numberOfRooms: "",
    checkinDate: "",
    checkoutDate: "",
  });
  const [amount, setAmount] = useState();
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [hotelDetails, sethotelDetails] = useState(null); // State to store hotel details
  const validateEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    // Check if phone number has exactly 10 digits
    return phoneNumber.length === 10;
  };
  useEffect(() => {
    // Fetch specific hotel details when component mounts
    const fetchhotelDetails = async () => {
      try {
        const response = await fetch(`/hotel/specificread/${hotelIdFromURL}`);
        if (response.ok) {
          const data = await response.json();
          sethotelDetails(data.hotels); // Set the fetched hotel details to state
          console.log(data.hotels);
        } else {
          throw new Error("Failed to fetch hotel details");
        }
      } catch (error) {
        console.error("Error fetching hotel details:", error);
        // Handle error - display a message or retry logic
      }
    };

    fetchhotelDetails(); // Call the function to fetch hotel details
  }, [hotelIdFromURL]);
  useEffect(() => {
    // This effect will run whenever amount changes
    if (bookingCompleted && amount !== undefined) {
      history.push(
        `/payment-options?hotel_id=${hotelIdFromURL}&amount=${amount}&checkinDate=${bookingDetails.checkinDate}&checkoutDate=${bookingDetails.checkoutDate}&rooms=${bookingDetails.numberOfRooms}&name=${bookingDetails.name}&email=${bookingDetails.email}&phone_no=${bookingDetails.phone}`
      );
    }
  }, [bookingCompleted, amount, hotelIdFromURL, bookingDetails, history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (
      !bookingDetails.name ||
      !bookingDetails.email ||
      !bookingDetails.phone ||
      !bookingDetails.numberOfRooms ||
      !bookingDetails.checkinDate ||
      !bookingDetails.checkoutDate
    ) {
      toast({
        title: "Error",
        description: "Please fill in all the required fields correctly.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (!validateEmail(bookingDetails.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    if (!isPhoneNumberValid(bookingDetails.phone)) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number with 10 digits.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (hotelDetails) {
      const { roomprice } = hotelDetails;
      console.log(hotelDetails);
      const numberofRooms = parseInt(bookingDetails.numberOfRooms);
      const checkinDate = new Date(bookingDetails.checkinDate)
        .toISOString()
        .split("T")[0];
      const checkoutDate = new Date(bookingDetails.checkoutDate)
        .toISOString()
        .split("T")[0];
      const numberOfDays = Math.floor(
        (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
      );
      const discount = parseFloat(bookingDetails.discount);
      if (checkinDate > checkoutDate) {
        toast({
          title: "Error",
          description: `check-in date should be less than or equal to check-out date`,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        return;
      }
      let calculatedAmount;
      if (discount) {
        calculatedAmount =
          numberofRooms * roomprice -
          (discount * numberofRooms * roomprice) / 100;
        console.log(calculatedAmount);
      } else {
        calculatedAmount = numberofRooms * roomprice;
        console.log(calculatedAmount);
      }
      console.log(calculatedAmount);
      if (discount > 5) {
        toast({
          title: "Error",
          description: `discount percentage will be within 5%.`,
          status: "warning",
          duration: 1000,
          isClosable: true,
        });
      }
      setAmount(calculatedAmount);
      console.log("Booking Details submitted:", bookingDetails);

      setBookingDetails({
        name: "",
        email: "",
        phone: "",
        numberOfRooms: "",
        chekinDate: "",
        checkoutDate: "",
      });

      setBookingCompleted(true);

      // history.push('/payment-options');
      history.push(
        `/payment-options?hotel_id=${hotelIdFromURL}&amount=${calculatedAmount}&checkinDate=${checkinDate}&checkoutDate=${checkoutDate}&rooms=${numberofRooms}&name=${bookingDetails.name}&email=${bookingDetails.email}&phone_no=${bookingDetails.phone}`
      );
    }
  };

  return (
    <VStack spacing="4px">
      <FormControl id="name" isRequired mb="3">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          name="name"
          value={bookingDetails.name}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="email" isRequired mb="3">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={bookingDetails.email}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="phone" isRequired mb="3">
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          placeholder="Enter Your Phone Number"
          name="phone"
          value={bookingDetails.phone}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="numberOfRooms" isRequired mb="3">
        <FormLabel>Number of Rooms</FormLabel>
        <Input
          type="number"
          placeholder="Enter Number of People"
          name="numberOfRooms"
          value={bookingDetails.numberOfRooms}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="checkinDate" isRequired mb="3">
        <FormLabel>Check-in date</FormLabel>
        <Input
          type="date"
          name="checkinDate"
          value={bookingDetails.checkinDate}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="checkoutDate" isRequired mb="3">
        <FormLabel>Check-out date</FormLabel>
        <Input
          type="date"
          name="checkoutDate"
          value={bookingDetails.checkoutDate}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id="discount" mb="3">
        <FormLabel>Enter discount percentage you want</FormLabel>
        <Input
          type="number"
          name="discount"
          value={bookingDetails.discount}
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        bg="black"
        color="white"
        _hover={{
          boxShadow: "none",
          transition: "none",
        }}
        onClick={handleSubmit}
        fontSize={isSmallScreen ? "15px" : "18px"}
        width={isSmallScreen ? "85%" : "70%"}
      >
        Continue to Payment
      </Button>
      {bookingCompleted && <PaymentPage />}
    </VStack>
  );
};

export default HotelBookingDetails;
