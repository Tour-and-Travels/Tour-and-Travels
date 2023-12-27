// import React from 'react';
// import { Route } from 'react-router-dom';
// import { BrowserRouter as Router, Switch } from 'react-router-dom';
// import Footer from './Components/Footer/Footer';
// import Home from './Components/Home/Home';
// import Main from './Components/Main/Main';
// import Navbar from './Components/Navbar/Navbar';
// import LoginPage from './Components/Home/LoginPage';
// import BookingDetails from './Components/Booking/BookingDetails';
// import UpiPayment from './Components/Payment/UpiPayment';
// import CreditCardPayment from './Components/Payment/CreditCardPayment';
// import DebitCardPayment from './Components/Payment/DebitCardPayment';

// const App = () => {
//   return (
//     <Router>
//       <div className="App" style={{ backgroundColor: '#d4cccc' }}>
//         <Navbar />
//         <Switch>
//           <Route path="/" component={LoginPage} exact />
//           <Route path="/home" component={Home} />
//           <Route path="/main" component={Main} />
//           <Route path="/booking" component={BookingDetails} />
//           {/* Routes for payment pages */}
//           <Route path="/payment/upi" component={UpiPayment} />
//           <Route path="/payment/credit-card" component={CreditCardPayment} />
//           <Route path="/payment/debit-card" component={DebitCardPayment} />
//         </Switch>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import "./app.css";
import Footer from "./Components/Footer/Footer";
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
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

