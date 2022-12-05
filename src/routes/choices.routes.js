import { Router } from "express";
import { postChoice, postVote } from "../controllers/choice.controller.js";
import { choiceValidtaion } from "../middlewares/choiceValidation.middleware.js";
import { voteValidation } from "../middlewares/voteValidation.middleware.js";

const router = Router()

router.post("/choice", choiceValidtaion, postChoice)
router.post("/choice/:id/vote", voteValidation, postVote)

export default router