const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Todo"
        }
    ]
});

module.exports=mongoose.model('User', userSchema);

