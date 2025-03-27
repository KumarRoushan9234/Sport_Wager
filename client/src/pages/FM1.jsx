import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

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
      const response = await fetch("http://127.0.0.1:8000/predict", {
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center items-center bg-[#121A2C] text-white p-6">
        <div className="bg-[#182238] p-6 rounded-lg shadow-lg w-full max-w-md">
          <Toaster />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="text-lg font-bold text-[#1E90FF]">
              Home Team:
            </label>
            <select
              className="p-2 rounded border border-[#00C6A2] bg-[#1C2A48] text-white focus:ring focus:ring-[#1E90FF]"
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

            <label className="text-lg font-bold text-[#1E90FF]">
              Away Team:
            </label>
            <select
              className="p-2 rounded border border-[#00C6A2] bg-[#1C2A48] text-white focus:ring focus:ring-[#1E90FF]"
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

            <button
              type="submit"
              className="bg-[#1E90FF] text-white py-2 px-4 rounded hover:bg-[#00C6A2] transition"
            >
              Predict
            </button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-[#1C2A48] rounded shadow-md">
              <h3 className="text-lg font-bold">
                <span className="text-[#00C6A2]">Home Team:</span> {homeTeam}
              </h3>
              <h3 className="text-lg font-bold">
                <span className="text-[#00C6A2]">Away Team:</span> {awayTeam}
              </h3>
              <h3 className="text-lg font-bold">
                <span className="text-[#1E90FF]">Predicted Result:</span>{" "}
                {result}
              </h3>
            </div>
          )}

          {history && (
            <div className="mt-6 p-4 bg-[#1C2A48] rounded shadow-md">
              <h3 className="text-lg font-bold text-[#1E90FF]">History:</h3>
              <p className="text-gray-300">{history}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FM1;
