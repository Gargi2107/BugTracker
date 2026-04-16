const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} = require("../controllers/projectController");

const auth = require("../middleware/auth");

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

router.post("/:id/add-member", auth, addMember);
router.post("/:id/remove-member", auth, removeMember);

module.exports = router;