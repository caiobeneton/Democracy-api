import { choicesCollection } from "../database/db.js"

export async function postChoice(req, res){
    const choice = req.body
    try {
        await choicesCollection.insertOne(choice)
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}