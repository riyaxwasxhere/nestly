import express, { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  cancelVisitRequest,
  getOwnerVisitRequests,
  getStudentVisitRequests,
  requestVisit,
  updateRequestStatus
} from "../controllers/visitController.js";

const visitRouter = Router();

visitRouter.post("/requestVisit", isAuth, requestVisit);
visitRouter.get("/studentVisitRequests", isAuth, getStudentVisitRequests);
visitRouter.get("/ownerVisitRequests", isAuth, getOwnerVisitRequests);
visitRouter.delete("/cancelRequest/:visitRequestId", isAuth, cancelVisitRequest);
visitRouter.put("/updateRequestStatus/:id",isAuth,updateRequestStatus)

export default visitRouter;
