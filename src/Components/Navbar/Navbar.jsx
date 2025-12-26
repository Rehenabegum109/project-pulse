'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    setIsLoggedIn(!!token);
    setRole(userRole?.toLowerCase());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setRole(null);
    router.push("/");
  };

  return (
    <nav className="bg-white shadow fixed w-full z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="ProjectPulse Logo"
            width={120}
            height={50}
            className="rounded cursor-pointer"
          />
        </Link>

        {/* Center Menu */}
        <div className="flex gap-6 text-gray-700 font-medium">

          <Link href="/">Home</Link>

          <Link href="/projects">Projects</Link>

          {isLoggedIn && (
            <Link href="/dashboard">Dashboard</Link>
          )}


        </div>

        {/* Right Buttons */}
        <div>
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
