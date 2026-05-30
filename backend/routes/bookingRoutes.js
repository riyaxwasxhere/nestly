import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { cancelBookingRequest, checkBookingRequest, getBookingRequests, requestBooking } from "../controllers/bookingController.js";

const bookingRouter = Router();

bookingRouter.post("/request", isAuth, requestBooking);
bookingRouter.get("/getAllRequests", isAuth, getBookingRequests);
bookingRouter.get("/check/:listingId", isAuth, checkBookingRequest);
bookingRouter.delete("/cancel/:requestId", isAuth, cancelBookingRequest);

export default bookingRouter;
