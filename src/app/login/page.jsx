"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosSecure from "@/utils/useAxios";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosSecure.post("/auth/login", {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
   
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-100 flex flex-col">
        
           <h2 className="text-2xl items-center text-center mb-4">Login</h2>        
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
