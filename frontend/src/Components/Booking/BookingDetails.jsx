// BookingDetails.jsx
import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import PaymentPage from '../Payment/PaymentPage';
import { useLocation } from 'react-router-dom';

const BookingDetails = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 400px)');
  const history = useHistory();
  const location = useLocation();
 const toast = useToast();
  // Retrieve tour_id from the URL
  const searchParams = new URLSearchParams(location.search);
  const tourIdFromURL = searchParams.get('tour_id');
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfPeople: '',
    selectedDate: '',
   
  });
const [bookingCompleted, setBookingCompleted] = useState(false);
const [tourDetails, setTourDetails] = useState(null); // State to store tour details
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
    // Fetch specific tour details when component mounts
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(`/tour/specificread/${tourIdFromURL}`);
        if (response.ok) {
          const data = await response.json();
          setTourDetails(data.tour); // Set the fetched tour details to state
          console.log(data.tour);
        } else {
          throw new Error('Failed to fetch tour details');
        }
      } catch (error) {
        console.error('Error fetching tour details:', error);
        // Handle error - display a message or retry logic
      }
    };

    fetchTourDetails(); // Call the function to fetch tour details
  }, [tourIdFromURL]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
   
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.numberOfPeople || !bookingDetails.selectedDate) {
      toast({
        title: 'Error',
        description: 'Please fill in all the required fields correctly.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (!validateEmail(bookingDetails.email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    if (!isPhoneNumberValid(bookingDetails.phone)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid phone number with 10 digits.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
    if (tourDetails) {
    const {
      Price,
      maximum_occupancy,
      Starting_date,
      Ending_date,
    } = tourDetails;

    const numberOfPeople = parseInt(bookingDetails.numberOfPeople);
    const selectedDate = new Date(bookingDetails.selectedDate);

    // Calculate total amount
    const amount = Price * numberOfPeople;

    // Check if the number of people is within the maximum occupancy limit
    if (numberOfPeople > maximum_occupancy) {
      toast({
        title: 'Error',
        description: `Number of people exceeds maximum occupancy (${maximum_occupancy}).`,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    // Check if the selected date is within the tour date range
    const startDate = new Date(Starting_date);
    const endDate = new Date(Ending_date);
    if (selectedDate < startDate || selectedDate > endDate) {
      toast({
        title: 'Error',
        description: 'Selected date is not within the tour date range.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
  
    console.log('Booking Details submitted:', bookingDetails);
    


    setBookingDetails({
      name: '',
      email: '',
      phone: '',
      numberOfPeople: '',
      selectedDate: '',
      
    });

    setBookingCompleted(true);

    // history.push('/payment-options');
    history.push(`/payment-options?tour_id=${tourIdFromURL}&amount=${amount}`);
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

      <FormControl id="numberOfPeople" isRequired mb="3">
        <FormLabel>Number of People</FormLabel>
        <Input
          type="number"
          placeholder="Enter Number of People"
          name="numberOfPeople"
          value={bookingDetails.numberOfPeople}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="selectedDate" isRequired mb="3">
        <FormLabel>Select Date</FormLabel>
        <Input
          type="date"
          name="selectedDate"
          value={bookingDetails.selectedDate}
          onChange={handleInputChange}
        />
      </FormControl>

      <Button
        bg="black"
        color="white"
        _hover={{
          boxShadow: 'none',
          transition: 'none',
        }}
        onClick={handleSubmit}
        fontSize={isSmallScreen ? '15px' : '18px'}
        width={isSmallScreen ? '85%' : '70%'}
      >
        Continue to Payment
      </Button>
      {bookingCompleted && <PaymentPage />}
    </VStack>
  );
};

export default BookingDetails;
