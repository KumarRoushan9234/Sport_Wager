import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/" className={styles.logo}>
          Sport-Wager
        </Link>
      </h1>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/predictor" className={styles.navItem}>
              Prediction
            </Link>
          </li>
          <li>
            <Link to="/chat " className={styles.navItem}>
              Chat
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navItem}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
