import { useEffect, useState } from "react";
import API from "../api/axios";
import {useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);

  const fetchMyTickets = async () => {
    const res = await API.get("/tickets/my");
    setTickets(res.data);
  };
    const navigate = useNavigate();
  useEffect(() => {
    fetchMyTickets();
  }, []);

  return (
    <div>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex">

      <div className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h1 className="text-2xl font-extrabold text-indigo-600 mb-8">
          BugTracker
        </h1>

        <nav className="flex flex-col gap-4 text-gray-600">
          <span
          onClick={() => navigate("/")}
           className="hover:text-indigo-600 cursor-pointer">Home</span>
          <span
            onClick={() => navigate("/dashboard")}
            className="hover:text-indigo-600 cursor-pointer"
          >
            Projects
          </span>

          <span
            onClick={() => navigate("/my-tickets")}
            className="text-indigo-600"
          >
            My Tickets
          </span>
        </nav>
      </div>
<div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">
            My Tickets
          </h2>
        </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
          >
            <h3 className="font-bold text-indigo-600">{t.title}</h3>

            <p className="text-gray-600 text-sm mt-2">
              {t.description}
            </p>

            <div className="text-xs mt-3 text-gray-500">
              Status: {t.status === "todo" ? "To Do" : t.status === "inprogress" ? "In Progress" : "Done"}
            </div>

            <div className="text-xs text-gray-500">
              Priority: {t.priority=== "low" ? "Low" : t.priority === "medium" ? "Medium" : "High"}
            </div>

            <div className="text-xs text-gray-500">
              Project: {t.projectId?.title}
            </div>
          </div>
        ))}
      </div>

      {tickets.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No assigned tickets.
        </p>
      )}
    </div>
    
    </div>
    <Footer />
    </div>

  );
}