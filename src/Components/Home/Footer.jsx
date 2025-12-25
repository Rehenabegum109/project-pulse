// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 ">
      <div className="max-w-6xl mx-auto px-6 md:flex md:justify-between md:items-center">
        
        {/* Brand / Logo */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-white">ProjectPulse</h1>
          <p className="text-gray-400 mt-2">
            Track projects, gather feedback, and boost team productivity.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mb-6 md:mb-0">
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <ul className="flex flex-col md:flex-row md:space-x-6">
            <li className="hover:text-white transition"><a href="#">Home</a></li>
            <li className="hover:text-white transition"><a href="#">Projects</a></li>
            <li className="hover:text-white transition"><a href="#">Feedback</a></li>
            <li className="hover:text-white transition"><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold mb-2">Contact</h2>
          <p>Email: info@projectpulse.com</p>
          <p>Phone: +880 1234 567890</p>
          <div className="flex space-x-3 mt-2">
            <a href="#" className="hover:text-white transition">🐦</a>
            <a href="#" className="hover:text-white transition">📘</a>
            <a href="#" className="hover:text-white transition">💼</a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
        &copy; 2025 ProjectPulse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
