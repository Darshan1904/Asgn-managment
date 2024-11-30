import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/default";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    generateAuthToken: () => string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user", // Default role is user
    },
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

UserSchema.methods.generateAuthToken = function (): string {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRES_IN }
    );
};

UserSchema.methods.comparePassword = async function(candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.personal_info.password);
}

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
