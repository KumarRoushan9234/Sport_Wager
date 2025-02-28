import React, { useState } from "react";
import styles from "./FM1.module.css";
import { Toaster, toast } from "react-hot-toast";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const teams = [
  "Man City",
  "West Ham",
  "Middlesbrough",
  "Southampton",
  "Everton",
  "Aston Villa",
  "Bradford",
  "Arsenal",
  "Ipswich",
  "Newcastle",
  "Liverpool",
  "Chelsea",
  "Man United",
  "Tottenham",
  "Charlton",
  "Sunderland",
  "Derby",
  "Coventry",
  "Leicester",
  "Leeds",
  "Blackburn",
  "Bolton",
  "Fulham",
  "West Brom",
  "Middlesboro",
  "Birmingham",
  "Wolves",
  "Portsmouth",
  "Crystal Palace",
  "Norwich",
  "Wigan",
  "Watford",
  "Sheffield United",
  "Reading",
  "Stoke",
  "Hull",
  "Burnley",
  "Blackpool",
  "Swansea",
  "QPR",
  "Cardiff",
  "Bournemouth",
  "Huddersfield",
  "Brighton",
  "Brentford",
];

const FM1 = () => {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (homeTeam === awayTeam) {
      toast.error("Home and Away teams cannot be the same.", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          home_team: homeTeam,
          away_team: awayTeam,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction.");
      }

      const data = await response.json();

      if (data.success) {
        const { predicted_result, history_summary } = data.data;
        setResult(predicted_result || "Prediction not available.");
        setHistory(history_summary || "No history available.");
        toast.success("Prediction fetched successfully!", {
          duration: 4000,
          position: "top-right",
        });
      } else {
        throw new Error(
          data.message || "An error occurred while fetching data."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error fetching result. Please try again.");
      setHistory("");
      toast.error("An error occurred. Please try again.", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.fm1}>
          <Toaster />
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>Home Team:</label>
            <select
              className={styles.select}
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Home Team
              </option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <label className={styles.label}>Away Team:</label>
            <select
              className={styles.select}
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Away Team
              </option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <button type="submit" className={styles.button}>
              Predict
            </button>
          </form>

          {result && (
            <div className={styles.resultBox}>
              <h3>
                <span className={styles.resultLabel}>Home Team:</span>{" "}
                {homeTeam}
              </h3>
              <h3>
                <span className={styles.resultLabel}>Away Team:</span>{" "}
                {awayTeam}
              </h3>
              <h3>
                <span className={styles.resultLabel}>Predicted Result:</span>{" "}
                {result}
              </h3>
            </div>
          )}

          {history && (
            <div className={styles.historyBox}>
              <h3 className={styles.historyLabel}>History:</h3>
              <p>{history}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FM1;
