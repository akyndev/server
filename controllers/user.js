import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please provide all inputs " });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    const token = JWT.sign(
      { name, email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(201).json({
      msg: "user successfully created",
      data: { user: { name: user.name, email: user.email }, token },
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all input" });
    }
    const user = await User.findOne({ email });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ msg: "Password incorrect" });
    }
    const token = JWT.sign(
      { name: user.name, email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      msg: "Successfully logged in",
      data: { user: { name: user.name, email }, token },
    });
  } catch (error) {
    console.log(error);
  }
};
