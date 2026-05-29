import Notification from "../models/Notification.js";

export const createNotification = async ({
  recipient,
  sender = null,
  type,
  title,
  message,
  relatedId = null,
  relatedModel = null
}) => {
  try {
    const notification = await Notification.create({
      recipient,
      sender,
      type,
      title,
      message,
      relatedId,
      relatedModel
    });

    return notification;
  } catch (error) {
    console.error("Notification Error:", error);
    return null;
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id
    })
      .populate("sender", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      isRead: false
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate(
  {
    _id: req.params.id,
    recipient: req.user.id
  },
  {
    isRead: true
  }
);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
