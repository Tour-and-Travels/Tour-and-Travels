import React, { useState } from "react";
import "./app.css";
import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./Components/ProfileManagement/LoginPage.js";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import BookingPage from "./Components/Booking/BookingPage";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import PaymentOptions from "./Components/Payment/PaymentOptions";
import DebitCardPayment from "./Components/Payment/DebitCardPayment"; // Import your DebitCardPayment component
import CreditCardPayment from "./Components/Payment/CreditCardPayment"; // Import your CreditCardPayment component
import UpiPayment from "./Components/Payment/UpiPayment";
import BookedTours from "./Components/Booking/BookedTours";
import ProfilePage from "./Components/ProfileManagement/ProfilePage.js";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const showNavbarRoutes = ["/", "/login", "/booked-tours", "/profile"];
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);
  return (
    <Router>
      {shouldShowNavbar && <Navbar />}
      <Switch>
        <Route path="/booking-details" component={BookingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/payment-options" component={PaymentOptions} />
        <Route path="/payment/upi" component={UpiPayment} />
        <Route path="/payment/credit-card" component={CreditCardPayment} />
        <Route path="/payment/debit-card" component={DebitCardPayment} />
        <Route path="/booked-tours" component={BookedTours} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/">
          <Home />
          <Main />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
