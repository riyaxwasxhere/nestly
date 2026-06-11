import User from "../models/User.js"

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};