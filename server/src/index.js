import express from 'express';
import dotenv from 'dotenv';
import summary from './routes/summary.js'
import cors from 'cors'

// Env Variable load
dotenv.config();

const app=express();

const PORT =process.env.PORT ||5000;


app.use(cors());
app.use(express.json());

app.use('/api', summary);


app.listen(PORT,()=>{
    console.log(`server runnning http://localhost:${PORT}/`)
}) 
