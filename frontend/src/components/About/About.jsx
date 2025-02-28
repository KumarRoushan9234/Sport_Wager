import React from "react";
import styles from "./About.module.css"; // Make sure to create and style this CSS file

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.pageTitle}>About Sport-Wager</h1>
      <section className={styles.description}>
        <h2>What is Sport-Wager?</h2>
        <p>
          Sport-Wager is an advanced sports prediction app built using
          state-of-the-art machine learning technologies. The app allows users
          to place informed bets on football matches based on predictive models
          that analyze historical data.
        </p>
      </section>

      <section className={styles.technologies}>
        <h2>How it Works</h2>
        <p>
          The app utilizes several key technologies to make accurate predictions
          and provide users with the best experience:
        </p>
        <ul>
          <li>
            <strong>React Frontend:</strong> The user interface is built with
            React, providing a dynamic and responsive experience.
          </li>
          <li>
            <strong>LSTM Model:</strong> Long Short-Term Memory (LSTM) models
            are used to predict football match outcomes based on past data.
          </li>
          <li>
            <strong>LLM (Large Language Models):</strong> A chatbot powered by
            LLMs helps users with predictions and answers queries regarding the
            matches.
          </li>
          <li>
            <strong>FastAPI Backend:</strong> FastAPI is used to handle the
            backend and serve predictions from the models efficiently.
          </li>
        </ul>
      </section>

      <section className={styles.currentLimitations}>
        <h2>Current Limitations</h2>
        <p>
          Currently, Sport-Wager focuses solely on football predictions. The
          prediction model is fine-tuned for football data and is limited to
          analyzing this sport. However, we are actively working on expanding
          the model to support more sports in the future, including basketball,
          tennis, and more.
        </p>
      </section>

      <section className={styles.futurePlans}>
        <h2>Future Plans</h2>
        <p>
          We plan to scale Sport-Wager by adding support for more sports and
          enhancing the prediction capabilities. Additionally, we're working on
          improving the chatbot functionality and providing a more personalized
          user experience.
        </p>
      </section>
    </div>
  );
};

export default About;
