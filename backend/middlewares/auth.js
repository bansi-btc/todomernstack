const User=require('../models/User');
const jwt=require('jsonwebtoken');

exports.auth=async(req, res, next)=>{
    try{
        const token=req.cookies.Token || req.headers.token;
        console.log(token);
        if(!token){
            return res.status(403).send({mes:"Login first"});
        }

        const data=jwt.verify(token, 'khushi123');
        req.body.user=data;
        next();
    }

    catch(err){
        console.log(err.message);
        res.status(400).send({mes:err.message});
    }
}