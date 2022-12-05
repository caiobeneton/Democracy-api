import { ObjectId } from "mongodb"
import { pollsCollection } from "../database/db.js"

export async function resultValidation(req, res, next){
    let pollId = req.params.id
    
    try {
        let pollExists = await pollsCollection.findOne({_id: ObjectId(pollId)})

        if (!pollExists){
            return res.sendStatus(404)
        }
    } catch (error) {
        return res.sendStatus(500)
    }

    next()
}