import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const JWT_SECRET = "rahma";
export const signup = async (req, res, next) => {
  //hashage:je recup le mdp puis hashage puis on save dans la bd le mdp hashé
  try {
    const hashedPWD = await bcrypt.hash(req.body.mdp, 10);
    const user = new User({
      ...req.body,
      mdp: hashedPWD,
    });
    await user.save();
    const { mdp, ...newUser } = user.toObject();
    res.status(200).json({ model: newUser, message: "success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginauth = async (req, res) => {
  try {
    //TODO check email
    const user = await User.findOne({ email: req.body.email });
    //TODO if is not exist return error
    if (!user) {
      return res.status(401).json({ message: "login ou mdp incprrecte" });
    }
    //n5alih necteb next yani
    const valid = await bcrypt.compare(req.body.mdp, user.mdp);
    if (!valid) {
      return res.status(401).json({ message: "login ou mdp incprrecte" });
    }

    res.status(200).json({
      token: jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "24h",
      }),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
