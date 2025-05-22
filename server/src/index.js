import express from 'express';
import dotenv from 'dotenv';

// Env Variable load
dotenv.config();

const app=express();
const PORT =process.env.PORT ||5000;

app.use(express.json());


app.listen(PORT,()=>{
    console.log(`server runnning http://localhost:${PORT}/`)
}) 
