import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  mdp: { type: String },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
});

export default mongoose.model("User", userSchema);
