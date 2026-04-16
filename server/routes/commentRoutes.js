const express = require("express");
const router = express.Router();
const {
  createComment,
  getComments,
} = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.post("/:ticketId", auth, createComment);
router.get("/:ticketId", auth, getComments);

module.exports = router;