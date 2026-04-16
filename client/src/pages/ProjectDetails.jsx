import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { DragDropContext, Droppable, Draggable,} from "@hello-pangea/dnd";
import Footer from "../components/Footer";
import Comments from "../components/Comments";

export default function ProjectDetails() {
  const { id } = useParams();

  const [tickets, setTickets] = useState([]);
  const [project, setProject] = useState(null);
  const [ticketError, setTicketError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");
  const [filters, setFilters] = useState({status: "", priority: "", assignee: "", search: "" });
  
  const [email, setEmail] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [error, setError] = useState("");

  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [modalPriority, setModalPriority] = useState("medium");
  const [modalAssignee, setModalAssignee] = useState("");

  const fetchProject = async () => {
    const res = await API.get("/projects");
    const current = res.data.find((p) => p._id === id);
    setProject(current);
  };

  const fetchTickets = async () => {
  let query = `?`;

  if (filters.status) query += `status=${filters.status}&`;
  if (filters.priority) query += `priority=${filters.priority}&`;
  if (filters.assignee) query += `assignee=${filters.assignee}&`;
  if (filters.search) query += `search=${filters.search}&`;

  const res = await API.get(`/tickets/${id}${query}`);
  setTickets(res.data);
};

  useEffect(() => { fetchProject();});
  useEffect(() => { fetchTickets();}, [filters]);

  const createTicket = async () => {
    if (!title.trim()) return;

    try {
      await API.post("/tickets", {
        title,
        description,
        priority,
        assignee,
        projectId: id,
        status: "todo",
      });

      setTitle("");
      setDescription("");
      setPriority("medium");
      setAssignee("");
      setShowForm(false);
      setTicketError("");
      fetchTickets();
    } catch (err) {
      setTicketError("Please assign the ticket to a user in the project");
    }
  };
 const updateFromModal = async () => {
  try {
    await API.put(`/tickets/${selectedTicket._id}`, {
      title: modalTitle,
      description: modalDesc,
      priority: modalPriority,
      assignee: modalAssignee,
    });

    setModalEdit(false);
    setSelectedTicket(null);
    fetchTickets();
  } catch (err) {
    alert("Update failed");
  }
};
  const handleDragEnd = async (result) => {
  if (!result.destination) return;

  const ticketId = result.draggableId;
  const newStatus = result.destination.droppableId;

  await API.put(`/tickets/${ticketId}`, {
    status: newStatus,
  });

  fetchTickets();
};

  const addMember = async () => {
    try {
      await API.post(`/projects/${id}/add-member`, { email });
      setEmail("");
      setError("");
      fetchProject();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding member");
    }
  };

  const removeMember = async (userId) => {
    try {
      await API.post(`/projects/${id}/remove-member`, { userId });
      fetchProject();
    } catch (err) {
      alert("Error removing member");
    }
  };

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex flex-col">
     
    <div className="p-8 flex-1">
<h1 className="mb-5 text-2xl font-extrabold text-indigo-600">
          BugTracker
        </h1>
        <div className="mb-4 text-sm text-gray-600 flex items-center gap-2">

  <Link 
    to="/" 
    className="hover:text-indigo-600 transition"
  >
    Home
  </Link>

  <span>›</span>

  <Link 
    to="/dashboard" 
    className="hover:text-indigo-600 transition"
  >
    Dashboard
  </Link>

  <span>›</span>

  <span className="text-indigo-600 font-medium">
    Project Details
  </span>

</div>
      
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Project Board
      </h2>

      <div className="mb-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">

  <div
    onClick={() => setShowMembers(!showMembers)}
    className="flex justify-between items-center p-5 cursor-pointer"
  >
    <h3 className="font-bold text-gray-700 text-lg">
      Team Members
    </h3>

    <span
  className={`inline-block text-2xl leading-none transition-all duration-300 ${
    showMembers
      ? "rotate-180 text-indigo-600 scale-110"
      : "text-gray-500 group-hover:text-indigo-500"
  }`}
>
  ▾
</span>
  </div>
{/* Members section */} 
  {showMembers && (
    <div className="px-5 pb-5">

      <div className="flex gap-3 mb-4">
        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => {setEmail(e.target.value); setError("");}}
          className="border border-gray-300 rounded-lg p-3 flex-1 focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addMember}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 hover:scale-105 transition"
        >
          Add
        </button>
      </div>
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-400 text-red-600 text-sm shadow-sm">
          ⚠️ {error}
        </div>
      )}

      {project?.teamMembers?.length === 0 && (
        <p className="text-gray-500 text-sm">No members yet</p>
      )}

      {project?.teamMembers?.map((m) => (
        <div
          key={m._id}
          className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-2 hover:shadow-md transition"
        >
          <div>
            <p className="font-semibold">{m.name || "User"}</p>
            <p className="text-xs text-gray-500">{m.email}</p>
          </div>

          <button
            onClick={() => removeMember(m._id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:scale-105 transition"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
</div>

      {/* Tickets section */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg mb-6 hover:bg-indigo-700 hover:scale-105 transition"
      >
        + Add Ticket
      </button>

      {showForm && (
        <div className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-xl mb-6">
          <h3 className="font-bold mb-4 text-gray-700 text-lg">
            Create Ticket
          </h3>

          <div className="flex flex-wrap gap-3">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => {setTitle(e.target.value); setTicketError("");}}
              className="border rounded-lg p-3 flex-1 focus:ring-2 focus:ring-indigo-500"
            />

            <input
              placeholder="Description"
              value={description}
              onChange={(e) => {setDescription(e.target.value); setTicketError("");}}
              className="border rounded-lg p-3 flex-1 focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={priority}
              onChange={(e) => {setPriority(e.target.value); setTicketError("");}}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={assignee}
              onChange={(e) => {setAssignee(e.target.value); setTicketError("");}}
              className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Assign User</option>
              {project?.teamMembers?.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.email}
                </option>
              ))}
            </select>
              

            <button
              onClick={createTicket}
              className="bg-green-500 text-white px-5 py-3 rounded-xl hover:scale-105 hover:bg-green-600 transition"
            >
              Create
            </button>
          </div>
          {ticketError && (
            <div className="mt-2 mb-4 p-3 rounded-xl bg-red-50 border border-red-400 text-red-600 text-sm shadow-sm">
              ⚠️ {ticketError}
            </div>
          )}
        </div>
      )}

      <div className="bg-white/70 backdrop-blur-lg p-4 rounded-2xl shadow mb-6 flex flex-wrap gap-3">
        <input
          placeholder="Search..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
          className="border rounded-lg p-2 text-sm"
        />

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
          className="border rounded-lg p-2 text-sm"
        >
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
          className="border rounded-lg p-2 text-sm"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={filters.assignee}
          onChange={(e) =>
            setFilters({ ...filters, assignee: e.target.value })
          }
          className="border rounded-lg p-2 text-sm"
        >
          <option value="">All Assignees</option>
          {project?.teamMembers?.map((m) => (
            <option key={m._id} value={m._id}>
              {m.email}
            </option>
          ))}
        </select>

        <button
          onClick={() =>
            setFilters({
              status: "",
              priority: "",
              assignee: "",
              search: "",
            })
          }
          className="bg-gray-300 px-3 py-2 rounded-lg text-sm hover:scale-105 transition"
        >
          Clear
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
  <div className="grid grid-cols-3 gap-4">
    {columns.map((col) => (
      <Droppable droppableId={col.id} key={col.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-100 p-4 rounded min-h-[400px]"
          >
            <h3 className="font-bold mb-3">{col.title}</h3>

            {tickets
              .filter((t) => t.status === col.id)
              .map((t, index) => (
                
                <Draggable key={t._id} draggableId={t._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        zIndex: 9999,
                      }}
                      className="bg-white/80 backdrop-blur-lg p-3 mb-3 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
                      onClick={() => setSelectedTicket(t)}  
                    >
                      <h4 className="font-semibold text-sm text-gray-800">
                        {t.title}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        👤 {t.assignee?.email || "Unassigned"}
                      </p>
                    </div>
                  )}
                </Draggable>
              ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ))}
  </div>
      </DragDropContext>

    </div>
    {selectedTicket && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-[500px] max-h-[80vh] overflow-y-auto relative">

      
      <button
        onClick={() => {
          setSelectedTicket(null);
          setModalEdit(false);

          setModalTitle("");
          setModalDesc("");
          setModalPriority("medium");
          setModalAssignee("");
        }}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        ✖
      </button>

      {modalEdit ? (
        <>
          <h2 className="text-xl font-bold mb-3">Edit Ticket</h2>

          <input
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <input
            value={modalDesc}
            onChange={(e) => setModalDesc(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <select
            value={modalPriority}
            onChange={(e) => setModalPriority(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={modalAssignee}
            onChange={(e) => setModalAssignee(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          >
            <option value="">Unassigned</option>
            {project?.teamMembers?.map((m) => (
              <option key={m._id} value={m._id}>
                {m.email}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={updateFromModal}
              className="bg-green-500 text-white px-4 py-2 rounded hover:scale-105 transition"
            >
              Save
            </button>

            <button
              onClick={() => setModalEdit(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:scale-105 transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-3">
            {selectedTicket.title}
          </h2>

          <p className="text-gray-600 mb-3">
            {selectedTicket.description}
          </p>

          <div className="text-sm space-y-1 mb-4">
            <p><b>Status:</b> {selectedTicket.status === "todo" ? "To Do" : selectedTicket.status === "inprogress" ? "In Progress" : "Done"}</p>
            <p><b>Priority:</b> {selectedTicket.priority === "low" ? "Low" : selectedTicket.priority === "medium" ? "Medium" : "High"}</p>
            <p>
              <b>Assigned:</b>{" "}
              {selectedTicket.assignee?.email || "Unassigned"}
            </p>
            <p>
              <b>Created:</b>{" "}
              {new Date(selectedTicket.createdAt).toLocaleDateString()}
            </p>
          </div>
          {/* Comments Section */}

          <Comments ticketId={selectedTicket._id} />

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setModalEdit(true);

                setModalTitle(selectedTicket.title);
                setModalDesc(selectedTicket.description);
                setModalPriority(selectedTicket.priority);
                setModalAssignee(selectedTicket.assignee?._id || "");
              }}
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:scale-105 transition"
            >
              Edit
            </button>

            <button
              onClick={async () => {
                await API.delete(`/tickets/${selectedTicket._id}`);
                setSelectedTicket(null);
                fetchTickets();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:scale-105 transition"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}
    <Footer />
    </div>
  );
}