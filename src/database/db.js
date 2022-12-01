import {MongoClient} from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI)

try {
    await mongoClient.connect()
    console.log("MongoDB connected!")
} catch (error) {
    console.log(error)
}

const db = mongoClient.db("drivencracy")
export const pollsCollection = db.collection("polls")