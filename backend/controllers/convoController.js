import Conversations from "../models/Conversations.js";
import Messages from "../models/Messages.js";
import User from "../models/User.js";

export const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    let conversation = await Conversations.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (conversation) {
      return res.status(200).json(conversation);
    }

    conversation = await Conversations.create({
      members: [senderId, receiverId]
    });

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({
      members: { $in: [userId] }
    });
    const convoUserData = conversations.map(async (convo) => {
      const receiverId = convo.members.find(
        (member) => member.toString() !== userId
      );
      const receiver = await User.findById(receiverId);
      if (!receiver) return null;
      return {
        conversationId: convo._id,
        receiverId: receiver._id,
        receiverName: receiver.fullname,
        receiverProfilePic: receiver.profilePic,
        lastMessage: convo.lastMessage,
        lastMessageAt: convo.lastMessageAt
      };
    });
    const result = await Promise.all(convoUserData);
    res.status(200).json(result.filter(Boolean));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getConversationById = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const conversation = await Conversations.findById(conversationId);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;
    const newMessage = new Messages({
      conversationId,
      senderId,
      text
    });
    const savedMessage = await newMessage.save();
    await Conversations.findByIdAndUpdate(conversationId, {
      lastMessage: text,
      lastMessageAt: new Date()
    });
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessagesByConversationId = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const messages = await Messages.find({ conversationId });
    const messageUserData = messages.map(async (msg) => {
      const sender = await User.findById(msg.senderId);
      if (!sender) return null;
      return {
        messageId: msg._id,
        senderId: msg.senderId,
        senderProfilePic: sender.profilePic,
        text: msg.text,
        timestamp: msg.createdAt,
        user: {
          email: sender.email,
          fullName: sender.fullname
        }
      };
    });
    const result = await Promise.all(messageUserData);
    res.status(200).json(result.filter(Boolean));
  } catch (error) {
    res.status(500).json(error);
  }
};
