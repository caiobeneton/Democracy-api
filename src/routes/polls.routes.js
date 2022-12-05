import { Router } from "express"
import { getPoll, getPollChoices, postPoll } from "../controllers/poll.controller.js"
import { getPollChoicesValidation } from "../middlewares/getChoicesValidation.middleware.js"
import { pollValidation } from "../middlewares/pollValidation.middleware.js"

const router = Router()

router.post("/poll", pollValidation, postPoll)
router.get("/poll", getPoll)
router.get("/poll/:id/choice", getPollChoicesValidation, getPollChoices)

export default router