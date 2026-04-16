import { useEffect, useState } from "react";
import API from "../api/axios";
import {useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (editingId) {
      await API.put(`/projects/${editingId}`, {
        title,
        description: desc,
      });
      setEditingId(null);
    } else {
      await API.post("/projects", {
        title,
        description: desc,
      });
    }

    setTitle("");
    setDesc("");
    fetchProjects();
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  const editProject = (project) => {
    setTitle(project.title);
    setDesc(project.description);
    setEditingId(project._id);
  };

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
            className="text-indigo-600"
          >
            Projects
          </span>

          <span
            onClick={() => navigate("/my-tickets")}
            className="hover:text-indigo-600 cursor-pointer"
          >
            My Tickets
          </span>
        </nav>
      </div>

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">
            My Projects
          </h2>
        </div>

        <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-700">
            {editingId ? "Edit Project" : "Create New Project"}
          </h3>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Project Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition"
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:-translate-y-2 transition"
            >
              <div
                onClick={() => navigate(`/project/${p._id}`)}
                className="cursor-pointer"
              >
                <h3 className="text-lg font-bold text-indigo-600">
                  {p.title}
                </h3>

                <p className="text-gray-600 mt-2 text-sm">
                  {p.description}
                </p>

                <p className="text-xs mt-3 text-gray-500">
                  👥 Members: {p.teamMembers?.length || 0}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => editProject(p)}
                  className="bg-yellow-400 px-3 py-1 rounded text-sm hover:scale-105 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(p._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:scale-105 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center mt-16 text-gray-500">
            No projects yet. Create one above!
          </div>
        )}
      </div>
      

    </div>
    <Footer />
    </div>
  );
}