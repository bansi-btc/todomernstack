const User=require('../models/User');

exports.getUserDetails=async(req, res)=>{
    try{
        // let output=req.cookies
        let {user}=req.body;
        let email=user.email;

        const existingUser=await User.findOne({email});
        res.status(200).send(existingUser);
    }
    catch(err){
        console.log(err.message);
        res.status(400).send({mes:err.message});

    }
}