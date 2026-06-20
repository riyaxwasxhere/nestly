import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL || "https://nestly-6ydl.onrender.com/";

export const socket = io(URL, {
  autoConnect: false,
  withCredentials: true
});