"use client";

import axiosSecure from "@/utils/useAxios";
import React, { useEffect, useState } from "react";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get("/auth/me"); // create this backend route
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!user) return <p className="text-center mt-10">No profile data found.</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="mb-2">
        <span className="font-semibold">Name: </span>
        {user.name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Email: </span>
        {user.email}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Role: </span>
        {user.role}
      </div>
    </div>
  );
};

export default ProfilePage;
