'use client';

import Lottie from 'lottie-react';
import Link from 'next/link';
import dashboardAnimation from '../../../public/medical_app.json';

export default function LottieBanner() {
  return (
    <section className="relative w-full h-[500px] bg-gradient-to-r from-blue-200 to-blue-400 flex items-center mt-20">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-white">
        {/* Left text */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ProjectPulse</h1>
          <p className="text-xl md:text-2xl mb-4">
            Client Feedback & Project Health Tracker
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Go to Login
          </Link>
        </div>

        {/* Lottie animation on right */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Lottie animationData={dashboardAnimation} loop={true} className="w-96 h-96" />
        </div>
      </div>
    </section>
  );
}
