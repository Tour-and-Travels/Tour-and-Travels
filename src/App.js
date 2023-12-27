import React from "react";
import "./app.css";
import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./Components/Home/LoginPage.js";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import BookingPage from "./Components/Booking/BookingPage";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import PaymentOptions from "./Components/Payment/PaymentOptions";
import DebitCardPayment from "./Components/Payment/DebitCardPayment"; // Import your DebitCardPayment component
import CreditCardPayment from "./Components/Payment/CreditCardPayment"; // Import your CreditCardPayment component
import UpiPayment from "./Components/Payment/UpiPayment";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/booking-details" component={BookingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/payment-options" component={PaymentOptions} />
        <Route path="/payment/upi" component={UpiPayment} />
        <Route path="/payment/credit-card" component={CreditCardPayment} />
        <Route path="/payment/debit-card" component={DebitCardPayment} />
        <Route path="/">
          <Navbar />
          <Home />
          <Main />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
