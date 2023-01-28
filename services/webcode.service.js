import { client } from "../index.js";


export async function createWebcode(data) {
    return await client.db("Mongo-node").collection("webcode").insertOne(data);
}

export async function getwebcodeByEmail(email) {
    return await client
        .db("Mongo-node").collection("webcode").findOne({ email : email });
}


