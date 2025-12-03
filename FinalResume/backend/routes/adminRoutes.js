import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import { getAdminDashboard, toggleUserActive,getResumes } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { deleteResume } from "../controllers/adminController.js";
const router = express.Router();

router.post("/login", adminLogin);

// Only admins can access

router.get("/dashboard", protect, admin, getAdminDashboard);
router.patch("/users/:id", protect, admin, toggleUserActive);
router.get("/resumes", protect, admin, getResumes);
// DELETE /api/admin/resumes/:id
router.delete("/resumes/:id", protect, admin, deleteResume);
export default router;
