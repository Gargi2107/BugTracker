import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">

      <Navbar />

      <section className="text-center py-24 px-6">
        <h2 className="text-5xl font-extrabold leading-tight text-gray-800">
          Track Bugs. Ship Faster.  
          <span className="text-indigo-600"> Collaborate Better.</span>
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          A powerful issue tracker built for modern teams.  
          Manage projects, assign tasks, and collaborate seamlessly.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/register">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:bg-indigo-700 transition">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl hover:bg-indigo-50 transition">
              Login
            </button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 px-10 pb-20">
        {[
          {
            title: "Kanban Boards",
            desc: "Drag and drop tasks with smooth workflows.",
          },
          {
            title: "Team Collaboration",
            desc: "Assign tasks, comment, and work together in real-time.",
          },
          {
            title: "Smart Filtering",
            desc: "Find issues instantly with powerful filters and search.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition"
          >
            <h3 className="text-xl font-bold text-indigo-600 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>
      
      <Footer />
      
    </div>
  );
}