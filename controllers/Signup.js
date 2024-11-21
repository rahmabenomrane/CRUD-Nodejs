import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({
      message: "Utilisateur créé avec succès.",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
