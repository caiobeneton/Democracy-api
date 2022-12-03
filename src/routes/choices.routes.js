import { Router } from "express";
import { postChoice } from "../controllers/choice.controller.js";
import { choiceValidtaion } from "../middlewares/choiceValidation.middleware.js";

const router = Router()

router.post("/choice", choiceValidtaion, postChoice)

export default router