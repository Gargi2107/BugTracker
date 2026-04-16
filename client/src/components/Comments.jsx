import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Comments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    const res = await API.get(`/comments/${ticketId}`);
    setComments(res.data);
  };

  useEffect(() => { fetchComments();}, [ticketId]);

  const addComment = async () => {
    if (!text.trim()) return;

    await API.post(`/comments/${ticketId}`, { text });

    setText("");
    fetchComments();
  };

  return (
    <div className="mt-2 border-t pt-2">
      <h4 className="text-sm font-semibold mb-1">Comments</h4>

      {/* LIST */}
      <div className="max-h-32 overflow-y-auto">
        {comments.map((c) => (
          <div key={c._id} className="text-xs mb-1">
            <b>{c.userId?.email || "User"}:</b> {c.text}
            <div className="text-gray-400">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add comment..."
          className="border p-1 text-xs flex-1"
        />
        <button
          onClick={addComment}
          className="bg-blue-500 text-white px-2 text-xs"
        >
          Send
        </button>
      </div>
    </div>
  );
}