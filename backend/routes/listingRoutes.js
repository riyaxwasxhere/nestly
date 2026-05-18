import express, { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { upload } from "../config/cloudinary.js";
import { createListing, getAllListings, getOwnerListings } from "../controllers/listingController.js";

const listingRouter = express.Router();

listingRouter.post(
  "/create",
  isAuth,
  upload.array("photos", 10),
  createListing
);
listingRouter.get('/owner/my-listings', isAuth, getOwnerListings);

listingRouter.get('/all', getAllListings);

export default listingRouter;
