import { compare, hash } from "bcrypt";
import bcrypt from "bcrypt";
import express from "express";
import { client } from "../index.js";
import { GetMovies, getMoviesById, createMovies, deleteMoviesById, updateMoviesById } from "../services/movies.service.js";
import { createUsers, getUsersByName } from "../services/users.service.js";
import jwt  from "jsonwebtoken";


const router = express.Router();


async function generatedHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashedPassword);
    return(hashedPassword);
}


// router.post("/signup", async function(request, response){
//     const data = request.body;
//     console.log(data);
//     const result = await createUsers(data);
//     response.send(result);
// })


//this step will make the password collapsed -> hashed password -> no one cannot recognize the password
router.post("/signup", async function(request, response){       //this line is navigating to signup page
    const {username, password} = request.body;

    const usersFromDB = await getUsersByName(username);
    if(usersFromDB){
        response.status(400).send({message : "user already exist"});
    }else if(password.length < 8){
        response.status(400).send({message : "Password must be atleast 8 charecters"});
    }else{
        const hashedPassword = await generatedHashedPassword(password);
        const result = await createUsers({username : username, password: hashedPassword });
        response.send(result);
    }
    
    // const hashedPassword = await generatedHashedPassword(password);                  //jumping into else statement bcoz if user exist if will print, if user doesnot exist else will print.
    // const result = await createUsers({username : username, password: hashedPassword });
    // response.send(result);
})


router.post("/login", async function(request, response){       //this line is navigating to signup page
    const {username, password} = request.body;

    const usersFromDB = await getUsersByName(username);
    if(!usersFromDB){                                                           //we are checking if the data is not from usersfromDb
        response.status(401).send({message : "Invalid Credentials"});
    }else{
        const storedDbPassword = usersFromDB.password; 
        const isPasswordCheck = bcrypt.compare(password, storedDbPassword);

    //the const token line will inserted after we create the login successful, this line is to generate token to browser
        if(isPasswordCheck){
            const token = jwt.sign({ id : usersFromDB._id }, process.env.SECRET_KEY);  
            response.status(401).send({message : "Successful login", token : token});
        }else{
            response.status(401).send({message : "Invalid Credentials"});
        }
    }
})



export default router;