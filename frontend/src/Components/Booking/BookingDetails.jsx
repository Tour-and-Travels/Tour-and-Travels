// BookingDetails.jsx
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import PaymentPage from '../Payment/PaymentPage';
import { useLocation } from 'react-router-dom';

const BookingDetails = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 400px)');
  const history = useHistory();
  const location = useLocation();

  // Retrieve tour_id from the URL
  const searchParams = new URLSearchParams(location.search);
  const tourIdFromURL = searchParams.get('tour_id');
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfPeople: '',
    selectedDate: '',
    // Add more fields as needed
  });
  const [bookingCompleted, setBookingCompleted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
   
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.numberOfPeople || !bookingDetails.selectedDate) {
      // Display an error message or handle validation as needed
      alert('Please fill in all the required fields.');
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
    history.push(`/payment-options?tour_id=${tourIdFromURL}`);

    
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
