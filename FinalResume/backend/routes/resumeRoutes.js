/*import express from "express";
import { createResume, getResumes, updateResume, deleteResume } from "../controllers/resumeController.js";
const router = express.Router();

router.post("/", createResume);
router.get("/:id", getResumes);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

export default router;
*/

/*import express from "express";
import { createResume, getUserResumes } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);

export default router;
*/
/* not saved now adding new code
import express from "express";
import { saveResume, getResumesByUser } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js"; // optional

const router = express.Router();

// If you have auth middleware, use it. If not, endpoints accept userId in body/params.
router.post("/save", protect, saveResume); // protected save
router.get("/user/:userId", protect, getResumesByUser); // protected fetch by userId

// If you prefer unprotected (no auth), comment protect and use these instead:
//router.post("/save", saveResume);
//router.get("/user/:userId", getResumesByUser);

export default router;
*/
/* ading update code
import express from "express";
import { saveResume, getResumesByUser } from "../controllers/resumeController.js";
import {
  
  getUserResumes,
  deleteResume,
  
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", protect, getUserResumes);
router.delete("/:id", protect, deleteResume);

router.post("/save", saveResume);
router.get("/user/:userId", getResumesByUser);

export default router;

*/
/*fixing logged user
import express from "express";
import {
  saveResume,
  getUserResumes,
  getResumesByUser,
  deleteResume,
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/", protect, getUserResumes);
router.delete("/:id", protect, deleteResume);

// Public routes
router.post("/save", saveResume);
router.get("/user/:userId", getResumesByUser);

export default router;
*/
import express from "express";
import {
  saveResume,
  getUserResumes,
  getResumesByUser,
  deleteResume,
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getResumeById } from "../controllers/resumeController.js";
import {updateResume}  from "../controllers/resumeController.js"
import Resume from "../models/resumeModel.js";
const router = express.Router();

// ✅ Protect the save route so req.user is available
//router.post("/save", protect, saveResume);

router.get("/", protect, getUserResumes);
router.get("/user/:userId", getResumesByUser);
router.get("/:id", protect, getResumeById);

//router.get("/:id", getResumeById);
router.delete("/:id", protect, deleteResume);
router.put("/:id", protect, updateResume);


// Optional admin or test route
//router.get("/user/:userId", getResumesByUser);
router.post("/save", protect, async (req, res) => {
  try {
    // 👇 Add this line at the very top
    console.log("Experience received:", req.body.experience);

    const newResume = new Resume({
      user: req.user._id,
      name: req.body.name,
      email: req.body.email,
      linkedin: req.body.linkedin,
      phone: req.body.phone,
      address: req.body.address,
      objective: req.body.objective,
      education: req.body.education,
      languageSkills: req.body.languageSkills,
      techSkills: req.body.techSkills,
      softSkills: req.body.softSkills,
      experience: req.body.experience, // must be array
      projects: req.body.projects,
      references: req.body.references,
      profilePic: req.body.profilePic,
      template: req.body.template || 1,
    });

    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
