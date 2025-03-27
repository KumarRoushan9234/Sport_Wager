import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black to-red-800 text-white p-6">
      {/* Hero Section */}
      <section className="bg-black/50 rounded-lg p-10 shadow-lg shadow-red-600 animate-fadeIn">
        <div className="max-w-lg text-center">
          <h1 className="text-5xl font-bold text-red-500 animate-neonGlow">
            Welcome to Sport-Wager
          </h1>
          <p className="text-lg text-red-300 mt-4">
            Your go-to platform for football predictions and live chat. Bet
            smarter with our AI-powered models!
          </p>
          <button
            onClick={() => navigate("/predictor")}
            className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg shadow-red-500 transition transform hover:bg-yellow-400 hover:scale-105"
          >
            Let's Go
          </button>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="flex flex-col gap-6 mt-10">
        <div className="bg-black/60 p-6 rounded-lg shadow-lg shadow-red-500 transition hover:scale-105">
          <h2 className="text-3xl font-bold text-red-500">
            What is Sport-Wager?
          </h2>
          <p className="text-gray-300 mt-2">
            Sport-Wager is an advanced sports prediction app using ML models to
            analyze football match data.
          </p>
        </div>

        <div className="bg-black/60 p-6 rounded-lg shadow-lg shadow-red-500 transition hover:scale-105">
          <h2 className="text-3xl font-bold text-red-500">How it Works</h2>
          <ul className="list-disc list-inside text-gray-300 mt-2">
            <li>
              <strong>React Frontend</strong>
            </li>
            <li>
              <strong>LSTM Model</strong>
            </li>
            <li>
              <strong>LLM (Large Language Models)</strong>
            </li>
            <li>
              <strong>FastAPI Backend</strong>
            </li>
          </ul>
        </div>

        <div className="bg-black/60 p-6 rounded-lg shadow-lg shadow-red-500 transition hover:scale-105">
          <h2 className="text-3xl font-bold text-red-500">Future Plans</h2>
          <p className="text-gray-300 mt-2">
            We plan to expand Sport-Wager by integrating more sports and
            improving chatbot predictions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
