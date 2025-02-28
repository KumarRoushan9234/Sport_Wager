import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FM1 from "./components/FM1/FM1";
import About from "./components/About/About";
import LandingPage from "./components/LandingPage/LandingPage";
import Chat from "./components/Chat/Chat";

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Header />  
        {/* Only show Header and Footer if we are not on the LandingPage */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingPage />
              </>
            }
          />
          
          <Route
            path="/predictor"
            element={
              <>
                {/* <Header /> */}
                <FM1 />
                {/* <Footer /> */}
              </>
            }
          />
          <Route
            path="/about"
            element={<><About /></>}
          />
          <Route path="/chat" element={<><Chat /></>}
          />
        </Routes>
        <Footer/>
      </div>

    </Router>
  );
};

export default App;
