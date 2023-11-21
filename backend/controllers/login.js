const User=require('../models/User');
const jwt=require('jsonwebtoken');

exports.login=async(req, res)=>{
    try{
        let {email,password}=req.body;
        let existingUser=await User.findOne({email});
        if(!existingUser){
            console.log('Bansi');
         return res.status(200).send({
            user:"notfound",
         });
        }

        if(existingUser.password===password){
            let payload={
                email,
                password,
            }

            let token=jwt.sign(payload, 'khushi123');

            return res.status(200).cookie('token', token).json({
                status:"OK",
                user:token,
            })
            // return res.status(200).cookie('Token',token,{
            //     httpOnly:true,
            // }).json({
            //     status:"success",
            //     token,
            //     data:existingUser,
            // })
        }
        
        return res.status(200).send({user:"passwordincorrect"});

    }
    catch(err){
        res.status(400).send({mes:err.message});
        console.log(err.message);

    }
}


// const updatedPost=await Post.findByIdAndUpdate(post, {$push : {likes:savedLike._id}}, {new:true});