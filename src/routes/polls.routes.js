import dayjs from "dayjs"
import { Router } from "express"

const router = Router()

router.post("/poll", (req, res) => {
    const now = dayjs().add(1,"M").format("YYYY-MM-DD HH:mm:ss")
    console.log(now)
})
router.get("/poll", (req, res) => {

})

export default router