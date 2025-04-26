import { Router } from "express";
import { getDashboardMetrics } from "../controller/dashboardController.js";

const router = Router();

router.get("/", getDashboardMetrics);

export default router