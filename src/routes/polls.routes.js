import { Router } from "express"
import { getPoll, getPollChoices, getResult, postPoll } from "../controllers/poll.controller.js"
import { getPollChoicesValidation } from "../middlewares/getChoicesValidation.middleware.js"
import { pollValidation } from "../middlewares/pollValidation.middleware.js"
import { resultValidation } from "../middlewares/resultsValidation.middleware.js"

const router = Router()

router.post("/poll", pollValidation, postPoll)
router.get("/poll", getPoll)
router.get("/poll/:id/choice", getPollChoicesValidation, getPollChoices)
router.get("/poll/:id/result", resultValidation, getResult)

export default router