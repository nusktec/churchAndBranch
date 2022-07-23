var mongoose = require('mongoose');

var recordsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    document:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"document",
        required:[true,'Document Primary Key is required'],
    },
    detail:{
        type:String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('records',recordsSchema);