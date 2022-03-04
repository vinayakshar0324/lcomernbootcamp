const mongoose =  require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const { v4 : uuidv4 } = require ('uuid');
uuidv4()

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastName:{
        type: String,
        maxlength: 32,
        trim: true,
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    userInfo:{
        type: String,
        trim: true
    },

    //TODO: come back here
    encry_password:{
        type: String,
        required: true
    },
    salt: String,
    role:{
        type: Number,
        default: 0
    },
    purchases:{ 
        type: Array,
        default: []
    }
},
{timestamps: true}
);


userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv4()
        this.encry_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })


userSchema.methods = {

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },


    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}


module.exports = mongoose.model("User",userSchema)