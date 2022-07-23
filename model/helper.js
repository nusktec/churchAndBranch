var mongoose = require('mongoose');

var helperSchema = new mongoose.Schema({

    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
        default:null,
    },
    token:{
        type:String,
        required:[true,'Token is required']
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default:null,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('helper',helperSchema);