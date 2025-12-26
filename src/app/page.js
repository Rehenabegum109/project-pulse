import Banner from "@/Components/Home/Banner";
import Header from "@/Components/Home/Banner";
import Feedback from "@/Components/Home/Feedback";
import Footer from "@/Components/Home/Footer";

import Features from "@/Components/Home/Features";
import HowItWorks from "@/Components/Home/How_It_Works";

export default function HomePage() {
  return (
    <div>
    <main className="bg-gradient-to-b from-blue-100 via-blue-100 to-white max-w-7xl mx-auto">
        <Banner/>
        <Features/>
        <HowItWorks/>
        
   
      <Feedback/>
     
      </main>
   
      </div>
       
  );
}
