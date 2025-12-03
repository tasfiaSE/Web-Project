import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Resume from "../models/resumeModel.js"; 
// --- ADMIN LOGIN CONTROLLER ---
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials - user not found" });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);
    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials - wrong password" });
    }

    // Check if admin
    console.log("isAdmin:", user.isAdmin);
    if (!user.isAdmin) {
      return res.status(401).json({ message: "Invalid credentials - not admin" });
    }

    // If all good, send token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/dashboard
export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();

    const users = await User.find().select("-password"); // exclude password
    // Optional: add resumeCount per user
    const usersWithResumeCount = await Promise.all(
      users.map(async (user) => {
        const resumeCount = await Resume.countDocuments({ user: user._id });
        return { ...user._doc, resumeCount };
      })
    );

    res.json({
      totalUsers,
      totalResumes,
      users: usersWithResumeCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/admin/users/:id
export const toggleUserActive = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: `User is now ${user.isActive ? "Active" : "Inactive"}`, isActive: user.isActive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// get resume
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().populate("user", "name email"); // optional: populate user info
    res.json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    await resume.deleteOne(); // <-- safer than remove() in Mongoose 7+
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error); // <-- check the console log
    res.status(500).json({ message: "Server error" });
  }
};