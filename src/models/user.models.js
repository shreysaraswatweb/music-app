const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user', 'artist'], //enum humko ye batata hai ki role ki value ya to user hogi ya artist hogi
        default: 'user',
    }
})

const userModel = mongoose.model("user", userSchema);  //"user": Its a collection name in Database.

module.exports = userModel;