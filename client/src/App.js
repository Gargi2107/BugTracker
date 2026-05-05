import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyTickets from "./pages/MyTickets";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ProjectDetails from "./pages/ProjectDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;