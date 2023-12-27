import React from "react";
import "./app.css";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Main from "./Components/Main/Main";
import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./Components/Home/LoginPage.js";
import { Route } from "react-router-dom";

const App = () => {
  //   return (
  //     <Router>
  //       <Navbar />
  //         <Route exact path="/" component={Home} />
  //         <Route path="/login" component={LoginPage} />
  //         <Route path="/main" component={Main} /> {/* Example main route */}
  //         {/* Other routes */}
  //     </Router>
  //   );
  return (
    <div className="App" style={{ backgroundColor: "#d4cccc" }}>
      <Route path="/" component={LoginPage} exact />
      <Route path="/home">
        {/* Components rendered for '/home' */}
        <Navbar />
        <Home />
        <Main />
        <Footer />
      </Route>
    </div>
  );
};

export default App;
