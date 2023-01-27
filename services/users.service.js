import { client } from "../index.js";
export async function createUsers(data) {
    return await client.db("Mongo-node").collection("users").insertOne(data);
}

//this function is to find whether the username is getting repeatedly, that's y we use if else statement, is username exist if will print, if username doesn't exist else will print.
export async function getUsersByName(username) {
    return await client
        .db("Mongo-node").collection("users").findOne({ username : username });
}