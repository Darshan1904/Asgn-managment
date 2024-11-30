import mongoose, { Schema } from 'mongoose';

const AssignmentSchema = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    task: { 
        type: String, 
        required: true 
    },
    admin: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    status: { 
        type: String, 
        default: "pending", 
        enum: ["pending", "accepted", "rejected"] 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Assignment = mongoose.model("Assignment", AssignmentSchema);

export default Assignment
