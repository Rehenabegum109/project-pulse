"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl bg-gradient-to-b from-blue-100 via-blue-100 to-white mx-auto p-6 mt-10 space-y-8">

      <h1 className="text-2xl mb-5 font-bold text-center ">About </h1>

      {/* Cards with Images */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        {/* Project Overview Card */}
        <motion.div className="bg-white shadow-lg rounded p-6 hover:shadow-2xl transition" variants={cardVariants}>
          <Image src="/jhr4travif.avif" alt="Project Overview" width={400} height={200} className="rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
          <p className="text-gray-700">
            ProjectPulse is a web-based system designed to monitor project health, gather structured client feedback,
            and provide actionable insights for software teams.
          </p>
        </motion.div>

        {/* Key Features Card */}
        <motion.div className="bg-white shadow-lg rounded p-6 hover:shadow-2xl transition" variants={cardVariants}>
          <Image src="/key-features.avif" alt="Key Features" width={400} height={200} className="rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Weekly employee progress check-ins</li>
            <li>Client feedback submission</li>
            <li>Automated project health scoring</li>
            <li>Risk management dashboard</li>
            <li>Role-based access control</li>
          </ul>
        </motion.div>

        {/* Technology Stack Card */}
        <motion.div className="bg-white shadow-lg rounded p-6 hover:shadow-2xl transition" variants={cardVariants}>
          <Image src="/project.avif" alt="Technology Stack" width={400} height={200} className="rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">Technology Stack</h2>
          <p className="text-gray-700">
            Frontend: Next.js + Tailwind CSS<br />
            Backend: Express.js or Next.js API Routes<br />
            Database: MongoDB<br />
            Authentication: JWT-based
          </p>
        </motion.div>

        {/* Workflow Card */}
        <motion.div className="bg-white shadow-lg rounded p-6 hover:shadow-2xl transition" variants={cardVariants}>
          <Image src="/hrhavif.avif" alt="Workflow" width={400} height={200} className="rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">How it Works</h2>
          <ol className="list-decimal list-inside space-y-1 text-gray-700">
            <li>Admin creates project and assigns clients & employees</li>
            <li>Employees submit weekly progress updates</li>
            <li>Clients submit feedback and flag issues if any</li>
            <li>System calculates project health score automatically</li>
            <li>Admin monitors dashboards and intervenes if needed</li>
          </ol>
        </motion.div>

        {/* Benefits Card */}
        <motion.div className="bg-white shadow-lg rounded p-6 hover:shadow-2xl transition" variants={cardVariants}>
          <Image src="/work floq.avif" alt="Benefits" width={400} height={200} className="rounded mb-4" />
          <h2 className="text-xl font-semibold mb-2">Benefits</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Early risk detection</li>
            <li>Transparent project progress</li>
            <li>Centralized client feedback</li>
            <li>Data-driven decision making</li>
          </ul>
        </motion.div>
      </motion.section>

    </div>
  );
}