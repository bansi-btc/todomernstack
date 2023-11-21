const mongoose=require('mongoose');

require('dotenv').config();

let dbConnect=()=>{
    // console.log(process.env.DATABASE_URL);

    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DB connection successfull")})
    .catch((err)=>{console.log(err)})

}

module.exports=dbConnect;