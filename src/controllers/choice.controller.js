import dayjs from "dayjs"
import { choicesCollection, votesCollection } from "../database/db.js"

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

export async function postVote(req, res){
    let choiceId = req.params.id
    let now = dayjs().format("YYYY-MM-DD HH:mm:ss")

    try {
        await votesCollection.insertOne({createdAt: now, choiceId})
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
    }
}