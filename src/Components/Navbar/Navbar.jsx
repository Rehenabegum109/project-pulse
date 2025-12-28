
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [open, setOpen] = useState(false);

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

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ];

  if (role === "admin") links.push(
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "My Risk", href: "/risks" },
    { label: "Activity", href: "/activity" },
    { label: "Profile", href: "/profile" }
  );
  if (role === "employee") links.push(
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Projects", href: "/projects" },
    { label: "Profile", href: "/profile" }
  );
  if (role === "client") links.push(
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Projects", href: "/projects" },
    { label: "Profile", href: "/profile" }
  );

  return (
    <header className="w-full bg-white shadow fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo + Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-2xl border shadow-sm hover:bg-gray-50"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/">
            <Image src="/logo.jpg" alt="ProjectPulse Logo" width={120} height={50} className="rounded cursor-pointer" />
          </Link>
        </div>

        {/* Desktop Links (Centered) */}
        <nav className="hidden lg:flex flex-1 justify-center gap-8 text-sm font-medium">
          {links.map(item => (
            <Link key={item.label} href={item.href} className="hover:text-blue-600 transition">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Login/Logout Button (Always Visible Right Side) */}
        <div className="flex ml-4">
          {!isLoggedIn ? (
            <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition">
              Logout
            </button>
          )}
        </div>

      </div>

      {/* Mobile Dropdown Menu (Links Only) */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t shadow-sm w-full"
          >
            <ul className="flex flex-col p-3 gap-2">
              {links.map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded-2xl hover:bg-gray-50 w-full"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
