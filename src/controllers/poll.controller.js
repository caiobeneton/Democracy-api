import dayjs from "dayjs"
import { choicesCollection, pollsCollection } from "../database/db.js"

export async function postPoll(req, res){
    const {title, expireAt} = req.body

    try {
        if (expireAt === ""){
            let now = dayjs().add(1,"M").format("YYYY-MM-DD HH:mm:ss")
            await pollsCollection.insertOne({title, expireAt: now})
            return res.sendStatus(201)
        }

        await pollsCollection.insertOne({title, expireAt})
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
    
}

export async function getPoll(req, res){
    try {
        const polls = await pollsCollection.find().toArray()
        res.send(polls)
    } catch (error) {
        res.sendStatus(500)
    }
}

export async function getPollChoices(req, res){
    let pollId = req.params.id
    try {
        let choices = await choicesCollection.find({pollId}).toArray()
        res.send(choices)
    } catch (error) {
        res.sendStatus(500)
    }
}