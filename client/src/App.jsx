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
      <div className="flex flex-col min-h-screen bg-black">
        <Header />

        <main className="flex-1 flex justify-center items-center pb-12">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/predictor" element={<FM1 />} />
            <Route path="/about" element={<About />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>

        <Footer className="bg-[#1e1e2f] text-gray-400 text-center py-4 text-sm font-roboto mt-8" />
      </div>
    </Router>
  );
};

export default App;
