var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        unique:[true, 'Name Of Document Must Be Unique']
    },
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
        required:[true,'Branch Primary Key is required'],
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default:null,
    },
    approved:{
        type:Boolean,
        default:false,
        require:true
    },
    seen:{
        type:Boolean,
        default:false,
        require:true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('document',documentSchema);