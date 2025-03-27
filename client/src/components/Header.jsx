import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center px-6 py-3 border-b-2 border-red-500 shadow-md rounded-lg w-11/12 mx-auto mt-4 sticky top-0 z-50">
      {/* Logo */}
      <h1>
        <Link
          to="/"
          className="text-xl font-bold hover:text-red-500 transition"
        >
          Sport-Wager
        </Link>
      </h1>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link to="/predictor" className="hover:text-red-500 transition">
              Prediction
            </Link>
          </li>
          <li>
            <Link to="/chat" className="hover:text-red-500 transition">
              Chat
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-red-500 transition">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
