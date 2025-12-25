import Banner from "@/Components/Home/Banner";
import Header from "@/Components/Home/Banner";
import Feedback from "@/Components/Home/Feedback";
import Footer from "@/Components/Home/Footer";

export default function HomePage() {
  return (
    <div>
    <main className="bg-gradient-to-b from-blue-100 via-blue-100 to-white max-w-7xl mx-auto">
        <Banner/>
     <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Project Health Score</h3>
            <p className="text-gray-600">Automatically calculated from progress and feedback.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Weekly Check-ins</h3>
            <p className="text-gray-600">Structured updates from employees and clients.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Risk Management</h3>
            <p className="text-gray-600">Identify and mitigate delivery risks early.</p>
          </div>
        </div>
      </section>
      <Feedback/>
     
      </main>
   
      </div>
       
  );
}
