//everytime to update we have to cut the server and to restart the server 
//To cut the server Ctrl+C
//Express JS
// const express = require("express");
import express from "express"; //"type" : "Module";
import { Db, MongoClient } from "mongodb";
import moviesRouter from "./routes/movies.route.js";
import usersRouter from "./routes/users.route.js";
import webcodeRouter from "./routes/webcode.route.js";
//import capstoneRouter from "./routes/capstone.route.js";
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from "cors";


export const app = express();

//We are storing the Mongo URL in Dotenv and that is secure file so we import that file(.env) and to index.js

dotenv.config();
console.log(process.env.MONGO_URL)

const PORT = process.env.PORT;
// const PORT = 4000; I changed port no as 6000 because something in port no 4000 running we cannot get output.

app.use(express.json());
app.use(cors());

//connection
//connection code between mongo and node
// const MONGO_URL = "mongodb://127.0.0.1";
// const MONGO_URL = "replacing the link which saved in env file";
const MONGO_URL = process.env.MONGO_URL;
//mongodb+srv://rishi:<password>@cluster0.jfvjpkw.mongodb.net/?retryWrites=true&w=majority --> got this link from Atlas->Deployment->Database
const client = new MongoClient(MONGO_URL); //dial
await client.connect();
console.log("Mongo is connected!!!");

app.get("/", function(request, response){
    response.send("🙋‍♂️, 🌏 🎊✨🤩 !!!");
});

// app.listen(PORT,() => console.log(`The server started in: ${PORT} ✨✨`));
// to get movies data in browser we use below code

// const movies = [
//     { "id" : "99",
//     "name": "Vikram",
//     "poster": "https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
//     "rating": 8.4,
//     "summary": "Members of a black ops team must track and eliminate a gang of masked murderers.",
//     "trailer": "https://www.youtube.com/embed/OKBMCL-frPU"
//     },
//     {
//     "id": "100",
//     "name": "RRR",
//     "poster":
//     "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
//     "rating": 8.8,
//     "summary": "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
//     "trailer": "https://www.youtube.com/embed/f_vbAtFSEc0"
//     },
//     {
//     "id": "101",
//     "name": "Iron man 2",
//     "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//     "rating": 7,
//     "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
//     "trailer": "https://www.youtube.com/embed/wKtcmiifycU"
//     },
//     {
//     "id": "102",
//     "name": "No Country for Old Men",
//     "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
//     "rating": 8.1,
//     "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//     "trailer": "https://www.youtube.com/embed/38A__WT3-o0"
//     },
//     {
//     "id": "103",
//     "name": "Jai Bhim",
//     "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
//     "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//     "rating": 8.8,
//     "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA"
//     },
//     {
//     "id": "104",
//     "name": "The Avengers",
//     "rating": 8,
//     "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
//     "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
//     "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8"
//     },
//     {
//     "id": "105",
//     "name": "Interstellar",
//     "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
//     "rating": 8.6,
//     "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
//     "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E"
//     },
//     {
//     "id": "106",
//     "name": "Baahubali",
//     "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
//     "rating": 8,
//     "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//     "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI"
//     },
//     {
//     "id": "107",
//     "name": "Ratatouille",
//     "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//     "rating": 8,
//     "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//     "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w"
//     }
//     ,
//     {
//     "name": "PS2",
//     "poster": "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyNDExMjcyMzA@._V1_.jpg",
//     "summary": "Ponniyin Selvan: I is an upcoming Indian Tamil-language epic period action film directed by Mani Ratnam, who co-wrote it with Elango Kumaravel and B. Jeyamohan",
//     "rating": "8",
//     "trailer": "https://www.youtube.com/embed/KsH2LA8pCjo",
//     "id": "108"
//     },
    
//     {
//     "name": "Thor: Ragnarok",
//     "poster": "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_.jpg",
//     "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\\n of researchers, to find a new planet for humans.",
//     "rating": "8.8",
//     "trailer": "https://youtu.be/NgsQ8mVkN8w",
//     "id": "109"
//     }
//     ]

// //getting datas from above local data
// app.get("/movies", function(request, response){
//     response.send(movies);
// });

//previous code pasted in movies.route.js

app.use("/movies", moviesRouter);
app.use("/users", usersRouter);
app.use("/webcode", webcodeRouter);
//app.use("/capstone", capstoneRouter);



// const mobiles = [
//     {
//     "model": "OnePlus 9 5G",
//     "img": "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
//     "company": "Oneplus"
//     },
//     {
//     "model": "Iphone 13 mini",
//     "img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
//     "company": "Apple"
//     },
//     {
//     "model": "Samsung s21 ultra",
//     "img": "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
//     "company": "Samsung"
//     },
//     {
//     "model": "Xiomi mi 11",
//     "img": "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
//     "company": "Xiomi"
//     }
//     ];
// /mobiles --> data

app.get("/mobiles", async(request, response) => {
    //db.mobiles.find({});
    const mobiles = await client.db("Mongo-node").collection("users").find({}).toArray();
    response.send(mobiles);
});

app.post("/mobiles", async (request, response) => {
    const data = request.body;
    //db.mobiles.insertMany(data);
    const result = await client.db("Mongo-node").collection("users").insertMany(data);
    response.send(result);
});







//capstone code starts here
app.post("/register", async function(request, response){
    const data = request.body;
    console.log(data);
    const mentor = await client.db("Capstone").collection("capstone").insertMany([data]);
    
    response.send(mentor);
})


app.get("/login", async function(request, response){
    const emailget = await client.db('Capstone').collection("capstone").find({});
    response.send(emailget);
})

//login check
app.post("/login", async function(request, response){
    try {
        const email = request.body.email;
        const password = request.body.password;
        //console.log(`${email} and your password is ${password}`);

        const emailpost = await client.db('Capstone').collection("capstone").findOne({email: email});
        
        if(emailpost.password === password){
            response.status(201).send("Successfull Login")
        }else{
            response.status(400).send("Invalid Login Credentials");
        }

    } catch (error) {
        response.status(400).send("Invalid email")
    }
})


app.post("/Leregistration", async function(request, response){
    const data = request.body;
    console.log(data);
    const mentor = await client.db("Capstone").collection("leregistration").insertMany([data]);
    response.send(mentor);
})

app.get("/LeExisting", async function(reques, response){
    const userget = await client.db('Capstone').collection("leregistration").find({}).toArray();
    response.send(userget);
})


app.post("/Ceregistration", async function(request, response){
    const data = request.body;
    console.log(data);
    const mentor = await client.db("Capstone").collection("ceregistration").insertMany([data]);
    response.send(mentor);
})

app.get("/CeExisting", async function(reques, response){
    const userget = await client.db('Capstone').collection("ceregistration").find({}).toArray();
    response.send(userget);
})

app.post("/Iperegistration", async function(request, response){
    const data = request.body;
    console.log(data);
    const mentor = await client.db("Capstone").collection("iperegistration").insertMany([data]);
    response.send(mentor);
})

app.get("/IpeExisting", async function(reques, response){
    const userget = await client.db('Capstone').collection("iperegistration").find({}).toArray();
    response.send(userget);
})

app.listen(PORT,() => console.log(`The server started in: ${PORT} ✨✨`));

export { client };

// async function generatedHashedPassword(password){
//     const NO_OF_ROUNDS = 10;
//     const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log(salt);
//     console.log(hashedPassword);
// }
// generatedHashedPassword("password@123");