

'use client';
import Link from 'next/link';
import { FaUsers, FaTasks, FaExclamationTriangle, FaRegCalendarAlt } from 'react-icons/fa';
import { RiEBikeFill } from 'react-icons/ri';
import { AiOutlineArrowLeft, AiOutlineHome, AiOutlineProject, AiOutlineUser } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function DashboardLayout({ children }) {
  const [role, setRole] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setRole(userRole);
  }, []);

  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userRole'); 
    localStorage.removeItem('token'); 
    router.push('/login'); 
  };
          
  const links = {
    

    admin: [
      { href: '/dashboard', label: '< Home',icon:<AiOutlineHome/> },
      { href: '/dashboard/admin/projects', label: 'Projects', icon: <AiOutlineProject /> },
      
      { href: '/dashboard/profile', label: 'Profile' },
    ],
    employee: [
      { href: '/dashboard/employee', label: ' Home',icon:<AiOutlineHome/> },
     
      { href: '/dashboard/employee/projects', label: 'Projects', icon: <AiOutlineProject /> },
      { href: '/dashboard/employee/checkins', label: 'Weekly Check-ins', icon:<FaRegCalendarAlt/> },
      { href: '/dashboard/employee/open-risks', label: 'Open Risks', icon: <FaExclamationTriangle /> },

      { href: '/dashboard/profile', label: 'Profile' ,icon:<AiOutlineUser/> },
    ],
    client: [
      { href: '/dashboard/client', label: 'Home',icon:<AiOutlineHome/> },
      { href: '/dashboard/client/projects', label: 'Projects', icon: <AiOutlineProject /> },
      {   
  href: '/dashboard/client/feedback',
  label: 'Feedbacks', 
  icon: <FaTasks /> 
},

        { href: '/dashboard/profile', label: 'Profile', icon: <AiOutlineUser /> }, 
    ],
  };



  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">
          {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Dashboard'}
        </h2>
          <div className="flex items-center mb-4">
    <AiOutlineArrowLeft
      size={24}
      className="cursor-pointer mr-4"
      onClick={() => router.back()} 
    />

  </div>
        <nav className="flex flex-col space-y-3">
          {role && links[role].map((link, i) => (
            <Link key={i} href={link.href} className="flex items-center gap-2 hover:text-gray-300">
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>
         {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        
        
        {children}</main>
    </div>
  );
}

