/*import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    summary: { type: String },
    education: { type: String },
    experience: { type: String },
    skills: { type: String },
    profilePic: { type: String }, // URL or base64 string
    template: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
*/
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },

    name: { type: String },
    email: { type: String },
    linkedin: { type: String },
    phone: { type: String},
    address: { type: String },

    summary: { type: String },
    objective: { type: String },
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: String },
      },
    ], 
    languageSkills: { type: String },
    techSkills: { type: String },
    softSkills: { type: String },
    experience: [
      {
        title: { type: String },
        company: { type: String },
        duration: { type: String },
        description: { type: String }
      }
    ],

    projects: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    references: { type: String }, // 🆕 Added reference field
    profilePic: { type: String },
    template: { type: String, required: true }
,
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;