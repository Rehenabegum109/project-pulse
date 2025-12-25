'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterAdminPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register-admin", {
        name, email, password
      });

      login(res.data.user); // memory-only login
      router.push("/dashboard"); // redirect to dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80 flex flex-col">
        <h1 className="text-xl font-bold mb-4 text-center">Register Admin</h1>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required className="border p-2 rounded mb-3"/>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required className="border p-2 rounded mb-3"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required className="border p-2 rounded mb-4"/>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
