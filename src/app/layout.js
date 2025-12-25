import Navbar from '@/Components/Navbar/Navbar';
import './globals.css';

import Footer from '@/Components/Home/Footer';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'ProjectPulse',
  description: 'Client Feedback & Project Health Tracker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-blue-100 via-blue-100 to-white font-sans">
        
        <AuthProvider>
        <Navbar/>
          <main className="flex-1 p-6 max-w-7xl mx-auto">
            {children}
          </main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
