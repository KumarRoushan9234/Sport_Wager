import React from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLetsGoClick = () => {
    navigate("/predictor");
  };

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Sport-Wager</h1>
          <p className={styles.heroDescription}>
            Your go-to platform for football predictions and live chat. Bet
            smarter with our AI-powered models!
          </p>
          <button onClick={handleLetsGoClick} className={styles.ctaButton}>
            Let's Go
          </button>
        </div>
      </section>

      <section className={styles.infoBoxes}>
        <div className={styles.infoBox}>
          <h2 className={styles.boxTitle}>What is Sport-Wager?</h2>
          <p>
            Sport-Wager is an advanced sports prediction app built using
            state-of-the-art machine learning technologies. The app allows users
            to place informed bets on football matches based on predictive
            models that analyze historical data.
          </p>
        </div>

        <div className={styles.infoBox}>
          <h2 className={styles.boxTitle}>How it Works</h2>
          <ul>
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

        <div className={styles.infoBox}>
          <h2 className={styles.boxTitle}>Future Plans</h2>
          <p>
            We plan to scale Sport-Wager by adding support for more sports and
            enhancing prediction capabilities, as well as improving chatbot
            functionality.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
