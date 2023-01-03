import express, { Router } from "express";
import { client } from "../index.js";
import { GetMovies, getMoviesById, createMovies, deleteMoviesById, updateMoviesById } from "../services/movies.service.js";
const router = express.Router();

// converted from index.js code
// getting datas from mongo server
router.get("/", async function(request, response){
    //rating is number only string wil display as output so we have to give this +symbol in front to convert it as number and show it in result.
    if(request.query.rating){
        request.query.rating = +request.query.rating;
    }

    console.log(request.query);
    //directly giving query to filter particular movie
   
    //find cursor will get if we didn't use toArray --> Cursor -> Pagination 1 2 3 4 Next | cursor to Array | to avoid find cursor use toArray();
    //const movies = await client.db("Mongo-node").collection("movies").find({name : "RRR"}).toArray();
    const movies = await GetMovies(request);
    // console.log(movies);
    response.send(movies);
});

//to get api using id in browser
router.get("/:id", async function(request, response){
     const { id } = request.params;
    console.log(id);

//     // db.movies.findOne({ id : "102" })
//     // const movie = await client.db("Mongo-node").collection("movies").findOne({ id : "102" });
   const movie = await getMoviesById(id); //getting this last id from line no 132 local params id

//     // const movie = movies.filter((mv) => mv.id === id)[0];
//     // const movie = movies.find((mv) => mv.id === id);
//     // response.send(movie)
    movie ?  response.send(movie) : response.status(404).send( {message : "movie not found"} );  //if id doesnot exist will show the message
})

//Create Movie
router.post("/", async function(request, response){
    const data = request.body;
    console.log(data);
    const result = await createMovies(data);
    response.send(result);
})

//Delete movie
router.delete("/:id", async function(request, response){
    const { id } = request.params;
    //db.movies.deleteOne({ id })

    const result = await deleteMoviesById(id);
    console.log(result);
    
    //we will get deletedCount in terminal once we hit send button on postman tool
    result.deletedCount > 0 ? response.send({message : "Movie deleted Successfully"}) : response.send({message : "Movie not found"});
})

//Update movie

router.put("/:id", async function(request, response){
    const { id } = request.params;
    const data = request.body;
    console.log(id);

    //db.movies.updateOne({ id : 101}, {$set : {rating : "7.5"}});
    //db.movies.updateOne({id : id}, {$set : data });

    // const result = await client.db("Mongo-node").collection("movies").updateOne({id : id}, {$set: data}); converted this to updated level in next line
    const result = await updateMoviesById(id, data);
    console.log(result);
    response.send(result);

})

export default router;


