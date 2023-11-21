const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const cors=require('cors');
require('dotenv').config();


let PORT=process.env.PORT ||3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use()
const routes=require('./routes/authRoutes');
app.use('/api/v1', routes);

app.listen(PORT, ()=>{
    console.log(`App is listening to port ${PORT}`);
})

let dbConnect=require('./config/database');
dbConnect();

