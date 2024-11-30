import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true },
    role: { 
        type: String, 
        required: true, 
        enum: ["user", "admin"] 
    },
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password") || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.name,
            role: this.role,
        }, 
        process.env.JWT_SECRET as string, 
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
}

const User = mongoose.model("User", UserSchema);

export default User;