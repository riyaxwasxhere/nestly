import express, { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { upload } from "../config/cloudinary.js";
import {
  createListing,
  deleteListing,
  getAllListings,
  getOwnerListings,
  updateListing
} from "../controllers/listingController.js";

const listingRouter = express.Router();

listingRouter.post(
  "/create",
  isAuth,
  upload.array("photos", 10),
  createListing
);

listingRouter.put(
  "/update/:id",
  isAuth,
  upload.array("photos", 10),
  updateListing
);

listingRouter.get("/owner/my-listings", isAuth, getOwnerListings);

listingRouter.get("/all", getAllListings);

listingRouter.delete("/delete/:id", deleteListing);

export default listingRouter;
