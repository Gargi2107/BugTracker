const Ticket = require("../models/Ticket");

exports.getMyTickets = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tickets = await Ticket.find({
      assignee: req.user,
    })
      .populate("assignee", "email name")
      .populate("projectId", "title")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    console.log("MY TICKETS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getTickets = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, priority, assignee, search } = req.query;

    let query = { projectId };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignee) query.assignee = assignee;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tickets = await Ticket.find(query)
      .populate("assignee", "email name")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("assignee", "email");

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignTicket = async (req, res) => {
  try {
    const { userId } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignee: userId },
      { new: true }
    ).populate("assignee", "email");

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};