// const Todo= require('../models/Todo');
const Todo=require('../models/Todo');
const User=require('../models/User');
const jwt=require('jsonwebtoken');
exports.createTodo=async(req, res)=>{
    try{
        let token=req.cookies.token || req.headers.token;
        // console.log(token);
        let payload=jwt.verify(token, 'khushi123');
        console.log(payload);
        let email=payload.email;

        let existingUser=await User.findOne({email});

        // let user=jwt.verif
        let {title}=req.body;

        let newTodo=new Todo({
            title,
            status:"pending"
        })

        let savedTodo=await newTodo.save();

        const updatedUser=await User.findByIdAndUpdate(existingUser._id, {$push : {todos:savedTodo._id}}, {new:true}).populate('todos').exec();

        res.status(200).json({
            success:true,
            user:updatedUser,
        })



        // let output=await newTodo.save();

        // res.status(200).send(output);
    }
    catch(err){
        res.status(400).json({
            msg:err.message,
        })
        console.log(err.message);
    }
}