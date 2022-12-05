import dayjs from "dayjs"
import { ObjectId } from "mongodb"
import { choicesCollection, pollsCollection } from "../database/db.js"

export async function voteValidation(req, res, next){
    let choiceId = req.params.id

    try {
        let choiceExists = await choicesCollection.findOne({_id: ObjectId(choiceId)})

        if (!choiceExists){
            return res.sendStatus(404)
        }

        let pollId = choiceExists.pollId
        let poll = await pollsCollection.findOne({_id: ObjectId(pollId)})
        let isValid = dayjs().isBefore(dayjs(poll.expireAt))

        if (!isValid){
            return res.sendStatus(403)
        }

    } catch (error) {
        return res.sendStatus(500)
    }

    next()
}