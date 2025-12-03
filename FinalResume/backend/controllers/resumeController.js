/*import Resume from "../models/Resume.js";

export const createResume = async (req, res) => {
  const resume = await Resume.create(req.body);
  res.json(resume);
};

export const getResumes = async (req, res) => {
  const resumes = await Resume.find({ userId: req.params.id });
  res.json(resumes);
};

export const updateResume = async (req, res) => {
  const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(resume);
};

export const deleteResume = async (req, res) => {
  await Resume.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};
*/
/*
import Resume from "../models/resumeModel.js";

// Save new resume
export const createResume = async (req, res) => {
  try {
    const { name, email, phone, address, summary, education, experience, skills, profilePic, template } = req.body;
    const userId = req.user._id;

    const resume = await Resume.create({
      user: userId,
      name,
      email,
      phone,
      address,
      summary,
      education,
      experience,
      skills,
      profilePic,
      template,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all resumes for a user
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/
/* problem kore r
import Resume from "../models/resumeModel.js";

// Save a resume (expects either req.user from auth or userId in body)
export const saveResume = async (req, res) => {
  try {
    // If you have auth middleware that sets req.user, prefer that:
    const userId = (req.user && req.user._id) || req.body.userId;
    if (!userId) return res.status(400).json({ message: "userId missing" });

    const {
      name,
      email,
      phone,
      address,
      summary,
      education,
      experience,
      skills,
      profilePic,
      template,
    } = req.body;

    const resume = await Resume.create({
      userId,
      name,
      email,
      phone,
      address,
      summary,
      education,
      experience,
      skills,
      profilePic,
      template,
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error("saveResume error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get resumes for a user
export const getResumesByUser = async (req, res) => {
  try {
    // If route is protected and req.user exists, use it:
    const userId = (req.user && req.user._id) || req.params.userId;
    if (!userId) return res.status(400).json({ message: "userId missing" });

    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error("getResumesByUser error:", error);
    res.status(500).json({ message: error.message });
  }
};
*/

/*addin for view page*/
/*import Resume from "../models/resumeModel.js";
//import Resume from "../models/Resume.js";
export const saveResume = async (req, res) => {

  console.log(req.body)
  try {
    const {
      userId: user,
      name,
      email,
      phone,
      address,
      summary,
      education,
      experience,
      skills,
      profilePic,
      template,
    } = req.body;

    /*const resume = await Resume.create({
      userId: user,
      name,
      email,
      phone,
      address,
      summary,
      education,
      experience,
      skills,
      profilePic,
      template,
    });
     //
    const resume = await Resume.create({
      userId: new mongoose.Types.ObjectId(user),
      name,
      email,
      phone,
      address,
      summary,
      education,
      experience,
      skills,
      profilePic,
      template,
});
    res.status(201).json(resume);
  } catch (error) {
    console.error("saveResume error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getResumesByUser = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error("getResumesByUser error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all resumes of logged-in user

export const getUserResumes = async (req, res) => {
  try {
    //console.log("Fetching resumes for user:", req.user._id);
    console.log("Logged in user:", req.user._id);
    const resumes = await Resume.find({ userId: req.user._id }).sort({ createdAt: -1 });
    console.log("Fetched resumes:", resumes);
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resumes", error });
  }
};
// Delete a resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }


    await Resume.deleteOne({ _id: req.params.id });
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resume", error });
  }
};

*/
import Resume from "../models/resumeModel.js";

// Save a new resume
/*export const saveResume = async (req, res) => {
  try {
    const {
      userId, // frontend sends userId
      name,
      email,
      linkedin,
      phone,
      address,
      summary,
      objective,
      education,
      languageSkills,
      techSkills,
      softSkills,
      experience,
      projects,
      references,
      profilePic,
      template,
    } = req.body;

    const resume = await Resume.create({
      user: userId, // 👈 match your schema field name
      name,
      email,
      linkedin,
      phone,
      address,
      summary,
      objective,
      education,
      languageSkills,
      techSkills,
      softSkills,
      experience,
      projects,
      references,
      profilePic,
      template,
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error("saveResume error:", error);
    res.status(500).json({ message: error.message });
  }
};
*/

export const saveResume = async (req, res) => {
  try {
    const userId = req.user._id; // ✅ এখন আর undefined হবে না
    console.log("User from token:", userId);

    const {
      name,
      email,
      linkedin,
      phone,
      address,
      summary,
      objective,
      education,
      languageSkills,
      techSkills,
      softSkills,
      experience,
      projects,
      references,
      profilePic,
      template,
    } = req.body;

    // ✅ Attach logged-in user's ID
    const resume = await Resume.create({
      user: req.user._id,
      name,
      email,
      linkedin,
      phone,
      address,
      summary,
      objective,
      education,
      languageSkills,
      techSkills,
      softSkills,
      experience,
      projects,
      references,
      profilePic,
      template,
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error("saveResume error:", error);
    res.status(500).json({ message: error.message });
  }
};


// Fetch all resumes of logged-in user
export const getUserResumes = async (req, res) => {
  try {
    console.log("Logged in user:", req.user._id);
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    console.log("Fetched resumes:", resumes);
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch resumes", error });
  }
};

// Fetch all resumes (admin or testing)
export const getResumesByUser = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get resume by id
/*export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};*/
export const getResumeById = async (req, res) => {
  try {
    console.log("🟢 Resume ID from URL:", req.params.id);

    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      console.log("❌ Resume not found");
      return res.status(404).json({ message: "Resume not found" });
    }

    console.log("✅ Resume found:", resume._id);
    res.json(resume);
  } catch (error) {
    console.error("🔥 getResumeById error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//update resume
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    console.log(resume.user , req.user._id )

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error: error.message });
  }
};


// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Resume.deleteOne({ _id: req.params.id });
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resume", error });
  }
};

