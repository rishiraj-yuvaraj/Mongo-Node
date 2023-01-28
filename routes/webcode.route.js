import { compare, hash } from "bcrypt";
import bcrypt from "bcrypt";
import express from "express";
import { client } from "../index.js";
import jwt  from "jsonwebtoken";
import { createWebcode, getwebcodeByEmail } from "../services/webcode.service.js";



const router = express.Router();

async function generatedHashedPassword(password){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashedPassword);
    return(hashedPassword);
}




router.post("/signup", async function(request, response){
    const { email, password } = request.body;
    
    const webcodeFromDB = await getwebcodeByEmail(email);

    if(webcodeFromDB){
        response.status(400).send({ message : "email already exists"})
    }else if(password.length<8){
        response.status(400).send({ message : "Password must atleast 8 charecters" });
    }
    else{
        const hashedPassword = await generatedHashedPassword(password);
        const result = await createWebcode({
            email : email,
            password : hashedPassword,
        });
        response.send(result);
    }
})


router.post("/login", async function(request, response){
    const { email, password } = request.body;
    
    const webcodeFromDB = await getwebcodeByEmail(email);
    if(!webcodeFromDB){
        response.status(401).send({ message : "Invalid Credentials"})
    }else{
        const storedDbPassword = webcodeFromDB.password;
       const isPasswordCheck = await bcrypt.compare(password, storedDbPassword);
       console.log(isPasswordCheck);

       if(isPasswordCheck){
        const token = jwt.sign({id: webcodeFromDB._id}, process.env.SECRET_KEY);
        response.send({message : "Successfull login", token : token });
       }else{
        response.send({message : "Invalid Credentials"});
       }
    }
})



router.get("/data", async function(request, response){
    const data = request.body;
    const webcodeFromDB = await client.db("Mongo-node").collection("webcode").find({}).toArray();  
    response.send(webcodeFromDB);
})

export default router;