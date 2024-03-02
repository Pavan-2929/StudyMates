import Activity from "../models/activity.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const createActivity = async (req, res, next) => {
  try {
    const userId = req.id.toString();
    console.log(userId);

    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    console.log(req.body);

    const newActivity = await Activity.create(req.body);

    res.status(200).json(newActivity);
  } catch (error) {
    next(error);
  }
};

export const getAllActivity = async (req, res, next) => {
  try {
    const allActivity = await Activity.find();

    res.status(200).json(allActivity);
  } catch (error) {
    console.log(error);
  }
};

export const getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);

    res.status(200).json(activity);
  } catch (error) {
    console.log(error);
  }
};
