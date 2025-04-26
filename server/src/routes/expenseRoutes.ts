import { Router } from "express";
import { getExpensesByCategory } from "../controller/expenseCOntroller.js";

const router = Router();

router.get("/", getExpensesByCategory);

export default router;
