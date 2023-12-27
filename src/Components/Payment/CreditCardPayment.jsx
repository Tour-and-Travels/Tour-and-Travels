import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const CreditCardPayment = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 400px)');
  const history = useHistory();

  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    amount: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const onClose = () => {
    setIsOpen(false);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCardDetails({
      ...creditCardDetails,
      [name]: value,
    });
  };

  const handleProceedToPay = () => {
    // Basic validation checks
    if (
      !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(creditCardDetails.cardNumber) ||
      !/^\d{3}$/.test(creditCardDetails.cvv) ||
      !/^\d{2}\/\d{4}$/.test(creditCardDetails.expiryDate)
    ) {
      setError('Please enter the details correctly.');
      return;
    }

    // Handle payment processing logic here
    console.log('Proceeding to pay via Credit Card with details:', creditCardDetails);

    // For demonstration purposes, show a success notification
    setIsOpen(true);
    setTimeout(() => {
        history.push('/payment-success');
      }, 1000);
  };

  return (
    <VStack spacing="4px">
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
      )}

      <FormControl id="cardNumber" isRequired mb="3">
        <FormLabel>Card Number</FormLabel>
        <Input
          placeholder="Enter Card Number"
          name="cardNumber"
          value={creditCardDetails.cardNumber}
          onChange={handleInputChange}
          maxLength="19"
        />
      </FormControl>

      <FormControl id="expiryDate" isRequired mb="3">
        <FormLabel>Expiry Date (MM/YYYY)</FormLabel>
        <Input
          placeholder="Enter Expiry Date"
          name="expiryDate"
          value={creditCardDetails.expiryDate}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="cvv" isRequired mb="3">
        <FormLabel>CVV</FormLabel>
        <Input
          placeholder="Enter CVV"
          name="cvv"
          value={creditCardDetails.cvv}
          onChange={handleInputChange}
          maxLength="3"
        />
      </FormControl>

      <FormControl id="cardHolderName" isRequired mb="3">
        <FormLabel>Card Holder Name</FormLabel>
        <Input
          placeholder="Enter Card Holder Name"
          name="cardHolderName"
          value={creditCardDetails.cardHolderName}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="amount" isRequired mb="3">
        <FormLabel>Enter Amount</FormLabel>
        <Input
          placeholder="Enter Amount"
          type="number"
          name="amount"
          value={creditCardDetails.amount}
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
        onClick={handleProceedToPay}
        fontSize={isSmallScreen ? '15px' : '18px'}
        width={isSmallScreen ? '85%' : '70%'}
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

            <AlertDialogBody>
              Thank you for your payment!
            </AlertDialogBody>

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

export default CreditCardPayment;