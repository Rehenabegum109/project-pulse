// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { user, isAuthenticated, logout } = useAuth();

//   return (
//     <nav className="bg-white shadow fixed w-full z-20">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        
//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src="/logo.jpg"
//             alt="ProjectPulse Logo"
//             width={100}
//             height={40}
//             className="rounded"
//           />
//         </Link>

//         {/* Desktop Links */}
//         <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 items-center">
//           <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
//           <li><Link href="/projects" className="hover:text-blue-600">Projects</Link></li>
//           <li><Link href="/feedback" className="hover:text-blue-600">Feedback</Link></li>
//           <li><Link href="/reports" className="hover:text-blue-600">Reports</Link></li>
//           {isAuthenticated && user?.role === 'admin' && (
//             <li><Link href="/riskboard" className="hover:text-red-600 font-semibold">Risk Board</Link></li>
//           )}
//         </ul>

//         {/* Desktop Auth Buttons */}
//         <div className="hidden md:flex space-x-3">
//           {user? (
//             <button
//               onClick={logout}
//               className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300 transition"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link href="/login" className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800 transition">
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile Hamburger */}
//         <button
//           className="md:hidden text-gray-700"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? '✖' : '☰'}
//         </button>
//       </div>

//       {/* Mobile Sidebar Menu */}
//       <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-30
//         ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <div className="flex justify-between items-center p-4 border-b">
//           <Link href="/">
//             <Image
//               src="/logo.jpg"
//               alt="ProjectPulse Logo"
//               width={100}
//               height={40}
//               className="rounded"
//             />
//           </Link>
//           <button
//             className="text-gray-700"
//             onClick={() => setMenuOpen(false)}
//           >
//             ✖
//           </button>
//         </div>
//         <ul className="flex flex-col mt-4 space-y-4 px-4">
//           <li><Link href="/" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link></li>
//           <li><Link href="/projects" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Projects</Link></li>
//           <li><Link href="/feedback" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Feedback</Link></li>
//           <li><Link href="/reports" className="hover:text-blue-600" onClick={() => setMenuOpen(false)}>Reports</Link></li>
//           {isAuthenticated && user?.role === 'admin' && (
//             <li>
//               <Link href="/riskboard" className="hover:text-red-600 font-semibold" onClick={() => setMenuOpen(false)}>
//                 Risk Board
//               </Link>
//             </li>
//           )}
//           {user ? (
//             <li>
//               <button
//                 onClick={() => { logout(); setMenuOpen(false); }}
//                 className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition w-full text-left"
//               >
//                 Logout
//               </button>
//             </li>
//           ) : (
//             <li>
//               <Link href="/login" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition" onClick={() => setMenuOpen(false)}>
//                 Login
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>

//       {/* Overlay */}
//       {menuOpen && <div className="fixed inset-0 bg-black/30 z-20" onClick={() => setMenuOpen(false)}></div>}
//     </nav>
//   );
// }
// 'use client';

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// export default function Navbar() {
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     setIsLoggedIn(false);
//     router.push("/login");
//   };

//   return (
//     <nav className="bg-white shadow fixed w-full z-20">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

//         {/* Left : Logo */}
//         <Link href="/">
//           <Image
//             src="/logo.jpg"
//             alt="ProjectPulse Logo"
//             width={120}
//             height={50}
//             className="rounded cursor-pointer"
//           />
//         </Link>

//         {/* Middle : Menu */}
//         <div className="flex gap-6 text-gray-700 font-medium">

//           <Link href="/">Home</Link>

//           <Link href="/projects">Projects</Link>

//           {isLoggedIn && (
//             <Link href="/dashboard">Dashboard</Link>
//           )}

//         </div>

//         {/* Right : Auth Buttons */}
//         <div>
//           {!isLoggedIn ? (
//             <Link
//               href="/login"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded transition"
//             >
//               Login
//             </Link>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>

//       </div>
//     </nav>
//   );
// }

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
    router.push("/login");
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

          {/* ⭐ Only Admin will see this */}
          {isLoggedIn && role === "admin" && (
            <Link href="/riskboard">Riskboard</Link>
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
