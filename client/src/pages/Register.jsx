import { useState } from "react";
import API from "../api/axios";
import { Link,useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    const res=await API.post("/auth/register", {
      name,
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    setError("");
    navigate("/login");
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100">

      <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-md">

        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Start managing your projects like a pro
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <input
            placeholder="Full Name"
            onChange={(e) => {setName(e.target.value); setError("");}}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            placeholder="Email"
            onChange={(e) => {setEmail(e.target.value); setError("");}}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {setPassword(e.target.value); setError("");}}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        {error && (
          <div className="mt-2 mb-4 p-3 rounded-xl bg-red-50 border border-red-400 text-red-600 text-sm shadow-sm">
            ⚠️ {error}
          </div>
        )}
        <button
          onClick={() => handleRegister(name, email, password)}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition"
        >
          Create Account
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
      
    </div>
    <Footer />
    </div>
  );
}