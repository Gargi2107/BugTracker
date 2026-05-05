const Groq = require("groq-sdk");
require("dotenv").config();
const Ticket = require("../models/Ticket");
const sendEmail = require("../utils/sendEmail");
const chats = {}; 
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chatWithAI = async (req, res) => {
  try {
    const { message, projectId } = req.body;
    const userId = req.user._id.toString();

    if (!chats[userId]) {
      chats[userId] = [];
    }

    chats[userId].push({ role: "user", content: message });

    // keep last 10 messages (important)
    const recentMessages = chats[userId].slice(-10);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an AI assistant for a bug tracking web application.You help users:- Understand how to use the app- Troubleshoot issues- Answer questions about features- Analyze tickets if provided. App Features:- User authentication (login/register)- Create and manage projects- Add/remove team members- Create, edit, delete tickets- Drag and drop ticket status- Filter and search tickets",
        },
        ...recentMessages,
      ],
      model: "llama-3.3-70b-versatile",
    });

    const reply = completion.choices[0]?.message?.content;

    chats[userId].push({ role: "assistant", content: reply });
    const isIssue =
        message.toLowerCase().includes("error") ||
        message.toLowerCase().includes("not working") ||
        message.toLowerCase().includes("issue") ||
        message.toLowerCase().includes("fail");

    if (isIssue) {
  try {
    console.log("Incoming message:", message);
    await sendEmail(
      "User Issue Reported",
      `User said: ${message}`
    );
  } catch (err) {
    console.log("Email failed:", err.message);
  }
}

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};