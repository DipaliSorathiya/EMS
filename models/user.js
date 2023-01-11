const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const bcrypt = require('bcrypt');
const emailVerificationToken = require('./emailVerificationToken');
const userSchema = mongoose.Schema({
    name :{
        type : String,
        trim: true,
        required: true
    },
    email: {
        type : String,
        trim : true,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required : true
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false,
    }

});
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
});


module.exports = mongoose.model('User',userSchema);

exports.verifyEmail = async (req,res) =>{
    const {userId,OTP} = req.body;

    if(!isValidaObjectId(userId)) return res.json({error:"Invalid user!"});
    await user.findById(userId)
    if(!user) return res.json({error:"user not found!"});
    if(user.isVerified) return res.json({error:"user is already verified!"});

    const token = await emailVerificationToken.findOne({owner:userId});
    if(!token) return res.json({error:"token not found!"});
}