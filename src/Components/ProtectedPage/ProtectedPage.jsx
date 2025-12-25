'use client';


import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage({ children, role }) {
  const { user } = useAuth();
  console.log(user)
  const router = useRouter();

  useEffect(() => {
    
    if (!user || (role && user.role !== role)) {
      router.push('/login');
    }
  }, [user, role, router]);

  if (!user) return <div>Loading...</div>;

  return children; // render protected content
}
