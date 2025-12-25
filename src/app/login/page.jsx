"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log('login response',data)

      // Save token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);

      // Redirect based on role
      if (data.user.role === "admin") router.push("/dashboard/admin");
      else if (data.user.role === "employee") router.push("/dashboard/employee");
      else if (data.user.role === "client") router.push("/dashboard/client");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  );
}

// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useAuth } from '@/context/AuthContext';

// export default function Navbar() {
//   const { user, logout, loading } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);

//   if (loading) return null;
//   const isAuthenticated = !!user;

//   return (
//     <nav className="bg-white shadow fixed w-full z-20">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
//         <Link href="/">
//           <Image src="/logo.jpg" alt="Logo" width={100} height={40} />
//         </Link>

//         <ul className="hidden md:flex space-x-6 items-center">
//           <li><Link href="/">Home</Link></li>
//           <li><Link href="/projects">Projects</Link></li>
//           <li><Link href="/feedback">Feedback</Link></li>
//           {isAuthenticated && user.role === 'admin' && (
//             <li><Link href="/riskboard">Risk Board</Link></li>
//           )}
//         </ul>

//         <div className="hidden md:flex space-x-3">
//           {isAuthenticated ? (
//             <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded">Logout</button>
//           ) : (
//             <Link href="/login" className="bg-blue-500 text-white px-4 py-1 rounded">Login</Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
