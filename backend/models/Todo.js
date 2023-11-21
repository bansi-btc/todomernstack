const mongoose=require('mongoose');

let todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    status:{
        type:String,
    }
});

module.exports=mongoose.model("Todo", todoSchema);