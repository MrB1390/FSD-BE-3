import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/user.schema.js";

dotenv.config();

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } = req.body; // Destructure fields from req.body
    const hashPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password: hashPassword, // Replace plain text password with hashed password
      profileImage: req.file.path
    });
    await newUser.save();
    res.status(201).json({
      message: "users created Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in Create User" });
  }
};

export const getUserAll = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Fetching the data",
    });
  }
};
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ userId: id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

export const updateUserById = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, email, phoneNumber } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: id },
      { firstName, lastName, email, phoneNumber },
      { new: true } // This option ensures that the updated user is returned
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findOneAndDelete({ userId: id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserRoleById = async (req, res) => {
  const id = req.params.id;
  const { role } = req.body; // Assuming the new role is sent in the request body

  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId: id },
      { role },
      { new: true } // This option ensures that the updated user is returned
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated successfully", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
