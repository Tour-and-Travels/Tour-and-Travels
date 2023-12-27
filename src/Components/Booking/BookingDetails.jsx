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

const BookingDetails = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 400px)');
  const history = useHistory();

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
    // Validate form fields before submission (add your validation logic)
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.numberOfPeople || !bookingDetails.selectedDate) {
      // Display an error message or handle validation as needed
      alert('Please fill in all the required fields.');
      return;
    }

    // Assuming a successful submission, you can proceed with further actions
    console.log('Booking Details submitted:', bookingDetails);
    

    // Clear the form fields after submission
    setBookingDetails({
      name: '',
      email: '',
      phone: '',
      numberOfPeople: '',
      selectedDate: '',
      // Reset other fields as needed
    });

    setBookingCompleted(true);

    history.push('/payment-options');
    // Add additional logic (e.g., redirect to a confirmation page, make an API request, etc.)
    // After handling submission, navigate to the payment page
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
