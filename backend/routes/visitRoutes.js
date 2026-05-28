import express, { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  cancelVisitRequest,
  getStudentVisitRequests,
  requestVisit
} from "../controllers/visitController.js";

const visitRouter = Router();

visitRouter.post("/requestVisit", isAuth, requestVisit);
visitRouter.get("/studentVisitRequests", isAuth, getStudentVisitRequests);
visitRouter.delete("/cancelRequest/:visitRequestId", isAuth, cancelVisitRequest);

export default visitRouter;
