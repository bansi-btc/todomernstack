const User=require('../models/User');

exports.signup=async(req, res)=>{
    try{
        const {email, password}=req.body;
        const existingUser=await User.findOne({email});
        // console.log(existingUser);
        if(existingUser){
            return res.status(400).json({
                message:"User already exist",
            });
        }
        let newUser=new User({email, password});

        let savedUser=await newUser.save();

        res.status(200).send(savedUser);
    }
    catch(err){
        res.status(400).send("Error in signup");
        console.log(err);
    }
}