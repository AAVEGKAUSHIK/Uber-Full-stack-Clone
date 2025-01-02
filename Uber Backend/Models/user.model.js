import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    FullName: {
        FirstName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 160
        },
        LastName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 160
        }
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    Password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function(){
    jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return token;
}
userSchema.methods.comparePassword = async function(Password){
    return await bcrypt.compare(Password, this.Password);
}
userSchema.pre('save', async function(next){
    if(this.isModified('Password')){
        this.Password = await bcrypt.hash(this.Password, 12);
    }
    next();
});
userSchema.methods.hashPassword = async function(Password){
    return await bcrypt.hash(Password, 12);
}


export default mongoose.model('User', userSchema);