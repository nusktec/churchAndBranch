var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Firstname is required']
    },
    lastName:{
        type:String,
        required:[true,'Surname is required']
    },
    phone:{
        type:String,
        required:[true,'Phone Number is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true, 'Email Already Exist In DataBase'],
        lowercase:true
    },
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"branch",
        required:[true,'Branch Primary Key is required'],
        unique:true
    },
    //would Use Password For Now
    password:{
        type:String,
    },
    rejected:{
        type:Boolean,
        default:false,
        require:true
    },
    approved:{
        type:Boolean,
        default:false,
        require:true
    },

    // Add Branch ID
},
{
    timestamps: true
})

module.exports = mongoose.model('users',usersSchema);