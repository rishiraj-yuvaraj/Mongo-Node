import { client } from "../index.js";

export async function updateMoviesById(id, data) {
    return await client.db("Mongo-node").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function deleteMoviesById(id) {
    return await client.db("Mongo-node").collection("movies").deleteOne({ id: id });
}
export async function createMovies(data) {
    return await client.db("Mongo-node").collection("movies").insertMany(data);
}
export async function getMoviesById(id) {
    return await client
        .db("Mongo-node").collection("movies").findOne({ id: id });
}
export async function GetMovies(request) {
    return await client.db("Mongo-node").collection("movies").find(request.query).toArray();
}
