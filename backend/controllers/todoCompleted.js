const Todo= require('../models/Todo')
const User=require('../models/User');
const jwt=require('jsonwebtoken');;

exports.todoCompleted=async(req, res)=>{
    try{
        // let token=req.cookies.token;
        // // console.log(token);
        // let payload=jwt.verify(token, 'khushi123');

        // let email=payload.email;

        // let existingUser=await User.findOne({email});

        let {id}=req.params;
        
        let output=await Todo.findByIdAndUpdate(id, {status:"Completed"});
        // let existingUser=await User.findOne({email}).populate('todos').exec();

        res.status(200).send(output);
    }
    catch(err){
        res.status(400).send("Err")
        console.log(err.message);
    }
}