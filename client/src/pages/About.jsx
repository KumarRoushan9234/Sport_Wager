import React from "react";

const About = () => {
  return (
    <div className="p-5 md:p-10 bg-gray-900 text-gray-200 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-green-500 text-center mb-6">
        About Sport-Wager
      </h1>

      <section className="mb-6">
        <h2 className="text-2xl text-green-500 font-semibold mb-2">
          What is Sport-Wager?
        </h2>
        <p className="text-gray-300">
          Sport-Wager is an advanced sports prediction app built using
          state-of-the-art machine learning technologies. The app allows users
          to place informed bets on football matches based on predictive models
          that analyze historical data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl text-green-500 font-semibold mb-2">
          How it Works
        </h2>
        <p className="text-gray-300">
          The app utilizes several key technologies to make accurate
          predictions:
        </p>
        <ul className="list-disc list-inside text-gray-300">
          <li>
            <strong className="text-green-400">React Frontend:</strong> Provides
            a dynamic and responsive UI.
          </li>
          <li>
            <strong className="text-green-400">LSTM Model:</strong> Uses past
            data to predict football match outcomes.
          </li>
          <li>
            <strong className="text-green-400">LLM Chatbot:</strong> Helps users
            with predictions and queries.
          </li>
          <li>
            <strong className="text-green-400">FastAPI Backend:</strong>{" "}
            Efficiently serves predictions from ML models.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl text-green-500 font-semibold mb-2">
          Current Limitations
        </h2>
        <p className="text-gray-300">
          Currently, Sport-Wager focuses solely on football predictions. The
          model is fine-tuned for football and does not support other sports.
          Future updates will include basketball, tennis, and more.
        </p>
      </section>

      <section>
        <h2 className="text-2xl text-green-500 font-semibold mb-2">
          Future Plans
        </h2>
        <p className="text-gray-300">
          We plan to expand Sport-Wager to support more sports, enhance
          prediction accuracy, and improve chatbot interactions for a
          personalized user experience.
        </p>
      </section>
    </div>
  );
};

export default About;
