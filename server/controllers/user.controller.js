import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import errorHandler from "../utils/error.js";

export const userData = async (req, res, next) => {
  try {
    const userID = req.id.toString();

    const user = await User.findById(userID).select("-password");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userID = req.id.toString();
    const updatedData = req.body;

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete updatedData.password;
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      { $set: updatedData },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const userData = await User.findById(req.params.id);

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

export const createBookmark = async (req, res, next) => {
  try {
    const { materialId } = req.body;
    console.log(materialId);

    const userId = req.id.toString();

    const user = await User.findById(userId);

    if (!user) {
      next(errorHandler(404, "user not found"));
    }

    const findMaterial = user.bookMark.indexOf(materialId);

    if (findMaterial === -1) {
      user.bookMark.push(materialId);
    } else {
      user.bookMark.splice(findMaterial, 1);
    }

    await user.save();
    res.status(200).json("bookmark Updated");
  } catch (error) {
    next(error);
  }
};

export const getInstructor = async (req, res, next) => {
  try {
    const users = await User.find({ userType: "instructor" });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
