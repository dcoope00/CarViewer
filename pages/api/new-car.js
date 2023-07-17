//the api folder is a unique folder recognized by nextjs to create api routes
//api routes allow for creation of api endpoints that receive and return json
//files in the api folder should contain functions with server side code
//functions are triggered when requests are sent to the route

//api/new-car
import { MongoClient } from "mongodb"

async function handler(req, res) {
    //req contains data about incoming request while res object is used to send response back

    if (req.method === "POST") {
        const dotenv = require("dotenv")
        dotenv.config()
        //body field contains data of incoming request
        const data = req.body

        //credentials are safe to store here because code in the api folder will never been seen on client side
        //connect returns a promise
        const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9qdbulj.mongodb.net/cars?retryWrites=true&w=majority`)
        //getting access to above database. if it does not exist it will be created
        const db = client.db()
        //mongodb is nosql. works with collections full of documents. collections = tables in sql and documents = entries in tables
        //here a single car is a single document. overall collection holds multiple cars/documents
        const carCollection = db.collection("cars")
        //insertOne() takes an object with the data to be inserted. returns a promise and an object 
        const result = await carCollection.insertOne(data)
        console.log(result)

        client.close()
        //send back response for http status code(201 for successful insert)
        res.status(201).json({message: "Car inserted"})
    }
}


export default handler

