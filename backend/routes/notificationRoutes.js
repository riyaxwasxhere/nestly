import { Router } from "express";
import isAuth from '../middleware/isAuth.js'
import { getNotifications, getUnreadCount, markAsRead } from "../controllers/notificationController.js";

const notificationRouter = Router()

notificationRouter.get("/",isAuth, getNotifications)
notificationRouter.get("/unreadCount",isAuth, getUnreadCount)
notificationRouter.patch("/:id/read",isAuth, markAsRead)

export default notificationRouter