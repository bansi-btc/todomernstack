const Todo= require('../models/Todo');
const User=require('../models/User');
const jwt=require('jsonwebtoken');

exports.deleteTodo=async(req, res)=>{
    try{
        let token=req.cookies.token || req.headers.token;
        // console.log(token);
        let payload=jwt.verify(token, 'khushi123');

        let email=payload.email;

        let existingUser=await User.findOne({email});

        let {id}=req.params;
        
        let deletedTodo=await Todo.findByIdAndDelete(id);

        const updatedUser=await User.findByIdAndUpdate(existingUser._id, {$pull : {todos:deletedTodo._id}}, {new:true}).populate('todos').exec();
        res.status(200).send(updatedUser);
    }
    catch(err){
        res.status(400).send("Err")
        console.log(err.message);
    }
}