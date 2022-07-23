var mongoose = require('mongoose');

var branchSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    location:{
        type:String,
        required:[true,'Location is required']
    },
    region:{
        type:String,
        required:[true,'Region is required']
    },
    pastor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default:null,
    },
    dateCreated:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    perviousPastor:{
        type:Array,
        default:[]
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('branch',branchSchema);