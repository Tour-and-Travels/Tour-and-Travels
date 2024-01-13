import React from "react";
import { Switch, Route } from "react-router-dom";
import Hoteldetails from "./Hoteldetails.js";
import HotelBookingDetails from "./HotelBookingDetails.jsx";
import PaymentOptions from "../Payment/PaymentOptions.jsx";

const HotelBookingPage = () => {
  return (
    <Switch>
      <Route path="/hotelbooking-details" component={HotelBookingDetails} />
      <Route path="/payment" component={PaymentOptions} />
      <Route path="/" component={Hoteldetails} />
    </Switch>
  );
};

export default HotelBookingPage;
