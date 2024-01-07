import React from 'react';
import { Button, VStack, useMediaQuery } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PaymentOptions = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 400px)');
  const history = useHistory();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const tourIdFromURL = searchParams.get('tour_id');
  const handlePayment = (method) => {
    
   
    console.log(`Payment via ${method}`);

    if (method === 'debit card') {
      history.push(`/payment/debit-card?tour_id=${tourIdFromURL}`);
    } else if (method === 'credit card') {
      history.push(`/payment/credit-card?tour_id=${tourIdFromURL}`);
    } else if (method === 'UPI') {
      history.push(`/payment/upi?tour_id=${tourIdFromURL}`);
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