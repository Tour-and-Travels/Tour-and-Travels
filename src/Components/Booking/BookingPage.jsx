import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import BookingDetails from './BookingDetails';
import PaymentOptions from '../Payment/PaymentOptions';

const BookingPage = () => {
  return (
    <Switch>
      <Route path="/booking-details" component={BookingDetails} />
      <Route path="/payment" component={PaymentOptions} />
      <Route path="/" component={Main} />
    </Switch>
  );
};

export default BookingPage;