import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e2f] text-gray-400 text-center py-6">
      <p className="text-sm">© 2025 Sport Wager. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://www.linkedin.com/in/kumar-roushan-9870b425b/"
          className="hover:text-[#00ff99] transition duration-300"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/KumarRoushan9234"
          className="hover:text-[#00ff99] transition duration-300"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
