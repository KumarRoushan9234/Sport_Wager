import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-[#00ff99]">
        Welcome to Sport Wager
      </h1>
      <p className="text-gray-400 mt-4 max-w-xl">
        Predict outcomes, bet smartly, and analyze games with AI-driven
        insights.
      </p>

      <Link to="/predictor">
        <button className="mt-6 px-6 py-3 bg-[#00ff99] text-black rounded-md hover:bg-opacity-90 transition duration-300">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
