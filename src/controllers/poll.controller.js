import dayjs from "dayjs"
import { pollsCollection } from "../database/db.js"

export async function postPoll(req, res){
    const now = dayjs().add(1,"M").format("YYYY-MM-DD HH:mm:ss")
}

export async function getPoll(req, res){
    try {
        const polls = await pollsCollection.find().toArray()
        res.send(polls)
    } catch (error) {
        res.sendStatus(500)
    }
}