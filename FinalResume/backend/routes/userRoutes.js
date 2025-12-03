/*import express from "express";
import { registerUser, loginUser, deleteUser } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

export default router;
*/

/*import express from "express";
/*import { registerUser, authUser } from "../controllers/userController.js";
import { registerUser, loginUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
/*router.post("/login", authUser);
router.post("/login", loginUser);   // <--- use loginUser here
router.delete("/:id", deleteUser);

export default router;
*/
/* add korram profile
import express from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

// Routes
router.post("/register", registerUser); // POST /api/users/register
router.post("/login", loginUser);       // POST /api/users/login
router.get("/", getUsers);              // GET /api/users
router.delete("/:id", deleteUser);      // DELETE /api/users/:id

export default router;
*/
import express from "express";
import multer from "multer";
import {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

// ✅ New route for profile update
//router.put("/profile", protect, upload.single("image"), updateUserProfile);
//router.put("/profile", protect, upload.single("profilePic"), updateUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
