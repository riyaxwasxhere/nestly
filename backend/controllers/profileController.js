import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, phone } = req.body;
    const updateData = {
      fullname: fullName,
      mobile: phone
    };
    if (req.file) {
      updateData.profilePic = req.file.path;
    }
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true
    });
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
