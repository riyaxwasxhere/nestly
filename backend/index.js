import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import listingRouter from "./routes/listingRoutes.js";
import convoRouter from "./routes/convoRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import savedRouter from "./routes/savedRouter.js";
import visitRouter from "./routes/visitRoutes.js";
import profileRouter from "./routes/profileRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("getUsers", [...onlineUsers.keys()]);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", {
        senderId,
        text
      });
    }
  });

  socket.on("disconnect", () => {
    for(const [userId, socketId] of onlineUsers) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("getUsers", [...onlineUsers.keys()]);
  });
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listings", listingRouter);
app.use("/api/conversations", convoRouter);
app.use("/api/saved", savedRouter);
app.use("/api/visits", visitRouter);
app.use("/api/profile", profileRouter);

app.use((err, req, res, next) => {
  console.log("GLOBAL ERROR:", err.message);
  res.status(500).json({ message: err.message });
});

httpServer.listen(port, () => {
  dbConnect();
  console.log(`Server is running on port ${port}`);
});
