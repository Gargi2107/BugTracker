const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getMyTickets,
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  assignTicket,
} = require("../controllers/ticketController");

router.use(auth);

router.post("/", createTicket);
router.get("/my", getMyTickets);
router.get("/:projectId", getTickets);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);
router.put("/:id/assign", assignTicket);

module.exports = router;