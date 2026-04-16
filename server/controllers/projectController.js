const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.user.id,
      teamMembers: [req.user.id],
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      teamMembers: req.user.id,
    }).populate("teamMembers", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const project = await Project.findById(req.params.id);

    if (!project.teamMembers.includes(user._id)) {
      project.teamMembers.push(user._id);
      await project.save();
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    project.teamMembers = project.teamMembers.filter(
      (member) => member.toString() !== req.body.userId
    );

    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};