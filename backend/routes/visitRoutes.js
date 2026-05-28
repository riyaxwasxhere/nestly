import express, { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { requestVisit } from "../controllers/visitController.js";

const visitRouter = Router();

visitRouter.post("/requestVisit", isAuth, requestVisit);

export default visitRouter;
