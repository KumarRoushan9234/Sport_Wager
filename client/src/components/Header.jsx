import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#1e1e2f] shadow-md py-4 px-6 md:px-12">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🔹 Logo */}
        <Link
          to="/"
          className="text-[#00ff99] text-2xl font-bold tracking-wide"
        >
          Sport Wager
        </Link>

        {/* 🔹 Navigation */}
        <nav className="space-x-6 hidden md:flex">
          <Link
            to="/"
            className="text-gray-300 hover:text-[#00ff99] transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/predictor"
            className="text-gray-300 hover:text-[#00ff99] transition duration-300"
          >
            Predictor
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-[#00ff99] transition duration-300"
          >
            About
          </Link>
          <Link
            to="/chat"
            className="text-gray-300 hover:text-[#00ff99] transition duration-300"
          >
            Chat
          </Link>
        </nav>

        {/* 🔹 Mobile Menu (optional, for later) */}
      </div>
    </header>
  );
};

export default Header;
