import React from 'react';
import { Button, VStack, useMediaQuery } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const PaymentOptions = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 400px)');
  const history = useHistory();
  const handlePayment = (method) => {
    // Handle payment based on the selected method
    // You can implement the payment processing logic here
    console.log(`Payment via ${method}`);

    if (method === 'debit card') {
      history.push('/payment/debit-card');
    } else if (method === 'credit card') {
      history.push('/payment/credit-card');
    } else if (method === 'UPI') {
      history.push('/payment/upi');
    }
  };

  return (
    
  
    <VStack spacing="4px" style={{ margin: 'auto' }}>
      <Button
        bg="black"
        color="white"
        _hover={{
          boxShadow: 'none',
          transition: 'none',
        }}
        onClick={() => handlePayment('debit card')}
        fontSize={isSmallScreen ? '15px' : '18px'}
        width={isSmallScreen ? '85%' : '70%'}
      >
        Pay with Debit Card
      </Button>
      <Button
        bg="black"
        color="white"
        _hover={{
          boxShadow: 'none',
          transition: 'none',
        }}
        onClick={() => handlePayment('credit card')}
        fontSize={isSmallScreen ? '15px' : '18px'}
        width={isSmallScreen ? '85%' : '70%'}
      >
        Pay with Credit Card
      </Button>
      <Button
        bg="black"
        color="white"
        _hover={{
          boxShadow: 'none',
          transition: 'none',
        }}
        onClick={() => handlePayment('UPI')}
        fontSize={isSmallScreen ? '15px' : '18px'}
        width={isSmallScreen ? '85%' : '70%'}
      >
        Pay with UPI
      </Button>
    </VStack>
    
  );
};

export default PaymentOptions;