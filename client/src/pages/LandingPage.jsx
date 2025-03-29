import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center text-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-[#1E90FF]">
        Welcome to Sport Wager
      </h1>
      <p className="text-gray-400 mt-4 max-w-xl">
        Predict outcomes, bet smartly, and analyze games with AI-driven
        insights.
      </p>

      <div className="mt-8 w-full max-w-md">
        <iframe
          id="sofa-standings-embed-36-61643"
          src="https://widgets.sofascore.com/embed/tournament/36/season/61643/standings/LaLiga?widgetTitle=LaLiga&showCompetitionLogo=true"
          style={{
            height: "500px",
            width: "100%",
            maxWidth: "768px",
            border: "none",
            overflow: "hidden",
          }}
          title="LaLiga Standings"
        ></iframe>
        <div className="text-xs text-gray-400 mt-2">
          Standings provided by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.sofascore.com/"
            className="text-[#1E90FF] hover:underline"
          >
            Sofascore
          </a>
        </div>
      </div>

      <Link to="/predictor">
        <button className="mt-6 px-6 py-3 bg-[#1E90FF] text-black rounded-md hover:bg-opacity-90 transition duration-300">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
