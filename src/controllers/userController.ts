import { Response } from "express";
import Assignment from "../models/assignmentModel";
import { AuthenticatedRequest } from "../middlewares/authenticate";
import User from "../models/userModel";

export const uploadAssignment = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const { task, assignedAdminEmail } = req.body;

        // Ensure the user is authorized to upload assignments
        if (!req.user || req.user.role !== 'user') {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        // Validate if the specified admin exists
        let adminToAssign = null;
        if (assignedAdminEmail) {
            adminToAssign = await User.findOne({ email: assignedAdminEmail, role: 'admin' });
            if (!adminToAssign) {
                res.status(404).json({ error: 'Admin not found' });
                return;
            }
        } else {
            // Assign to a random admin if not specified
            const admins = await User.find({ role: 'admin' });
            if (admins.length === 0) {
                res.status(404).json({ error: 'No admins available to assign' });
                return;
            }
            adminToAssign = admins[Math.floor(Math.random() * admins.length)];
        }

        // Create the assignment
        const assignment = await Assignment.create({
            task,
            userId: req.user?._id,
            admin: adminToAssign?._id,
        });

        res.status(201).json({ message: 'Assignment uploaded and tagged to an admin', assignment });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
