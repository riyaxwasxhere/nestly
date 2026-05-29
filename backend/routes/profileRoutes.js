import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { updateProfile } from "../controllers/profileController.js";
import { upload } from "../config/cloudinary.js";

const profileRouter = Router();

profileRouter.put(
  "/update",
  isAuth,
  upload.single("profilePic"),
  updateProfile
);
export default profileRouter;
