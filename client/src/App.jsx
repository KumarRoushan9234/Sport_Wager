import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FM1 from "./pages/FM1";
import About from "./pages/About";
import LandingPage from "./pages/LandingPage";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-gray-200">
        <Header />

        <main className="flex-1 container mx-auto px-6 md:px-12 lg:px-24 py-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/predictor" element={<FM1 />} />
            <Route path="/about" element={<About />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
