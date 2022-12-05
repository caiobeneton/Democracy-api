import { ObjectId } from "mongodb"
import dayjs from "dayjs"
import { choicesCollection, pollsCollection } from "../database/db.js"
import { choiceSchema } from "../models/choice.model.js"

export async function choiceValidtaion(req, res, next){
    const choice = req.body

    const {error} = choiceSchema.validate(choice, {abortEarly: false})

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send(errors)
    }

    try {
        let id = choice.pollId
        const pollExists = await pollsCollection.findOne({_id: ObjectId(id)})

        if (!pollExists){
            return res.sendStatus(404)
        }
        
        const validDate = dayjs().isBefore(dayjs(pollExists.expireAt))
        
        if (!validDate){
            return res.sendStatus(403)
        }

        const titleExist = await choicesCollection.findOne({title: choice.title})

        if (titleExist) {
            return res.sendStatus(409)
        }

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

    next()
}