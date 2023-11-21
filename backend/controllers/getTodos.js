const Todo= require('../models/Todo');
const User=require('../models/User');
const jwt=require('jsonwebtoken');
exports.getTodos=async(req, res)=>{
    try{
        let token=req.cookies.token || req.headers.token;
        // console.log(token);
        let payload=jwt.verify(token, 'khushi123');

        let email=payload.email;

        let existingUser=await User.findOne({email});

        // let output=await Todo.find({});
        let output=existingUser.todos;

        let resArr=[];

        for(let value of output){
            let obj=await Todo.findById(value);
            resArr.push(obj);
        }
        
        res.status(200).send(resArr);
    }
    catch(err){
        res.status(400).send({err:err.message})
        console.log(err.message);
    }
}