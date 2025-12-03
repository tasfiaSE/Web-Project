import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  personalInfo: Object,
  education: Array,
  experience: Array,
  skills: Array,
  projects: Array,
  template: String,
  colorTheme: String,
  picture: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Resume", resumeSchema);
