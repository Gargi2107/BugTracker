const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      ticketId: req.params.ticketId,
      userId: req.user.id,
      text: req.body.text,
    });

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      ticketId: req.params.ticketId,
    }).populate("userId", "email name");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};