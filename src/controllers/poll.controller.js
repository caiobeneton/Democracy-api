import dayjs from "dayjs"
import { ObjectId } from "mongodb"
import { choicesCollection, pollsCollection, votesCollection } from "../database/db.js"

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

export async function getResult(req, res){
    let pollId = req.params.id

    try {
        let choices = await choicesCollection.find({pollId}).toArray()
        let poll = await pollsCollection.findOne({_id: ObjectId(pollId)})
        let totals = []
        await Promise.all(choices.map( async (choice) => {
            let id = ObjectId(choice._id).toString()
            let votes = await votesCollection.find({choiceId: id}).toArray()
            let option = {
                title: choice.title,
                votes: votes.length
            }
            totals.push(option)
        }))
        
        let result = {}
        totals.map((opt) => {
            let num = 0
            if(opt.votes > num){
                num = opt.votes
                result = opt
            }
        })
        
        res.send({...poll, result})
    } catch (error) {
        res.sendStatus(500)
    }
}