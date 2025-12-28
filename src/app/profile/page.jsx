"use client";

import { useEffect, useState } from "react";
import axiosSecure from "@/utils/useAxios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.log("Profile load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading profile...</p>;

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load profile
      </p>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 via-blue-100 to-white  p-4">
   
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6 mt-10">My Profile</h2>

        
        <img
          src={user?.photo || "https://i.pravatar.cc/150"}
          alt="profile"
          className="w-28 h-28 rounded-full border shadow mx-auto mb-6"
        />

   
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner space-y-3">
          <ProfileField label="Name" value={user.name} />
          <ProfileField label="Email" value={user.email} />
          <ProfileField label="Role" value={user.role} />
        </div>

  
        {user.role === "employee" && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="font-medium">
              Assigned Projects: {user.projects?.length || 0}
            </p>
          </div>
        )}

        {user.role === "client" && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <p className="font-medium">
              Active Projects: {user.projects?.length || 0}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="flex justify-between px-2 py-1">
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}
