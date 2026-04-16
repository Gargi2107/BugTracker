import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/70 shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-indigo-600">
          BugTracker
        </h1>

        <div className="space-x-6 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <Link to="/login" className="hover:text-indigo-600 transition">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Signup
          </Link>
        </div>
      </nav>
    </div>
  );
}