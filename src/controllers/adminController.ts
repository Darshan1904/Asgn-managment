import { Request, Response } from 'express';
import Assignment from '../models/assignmentModel';
import { AuthenticatedRequest } from "../middlewares/authenticate";

/**
 * @desc    View assignments for the authenticated admin
 * @route   GET /api/admins/assignments
 * @access  Admin
 * @param   {AuthenticatedRequest} req - The request object, containing user information
 * @param   {Response} res - The response object
 * @returns {Promise<void>}
 */
export const viewAssignments = async (req: AuthenticatedRequest, res: Response) : Promise<void> => {
    try {
        // Ensure the user is authorized
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        // Fetch assignments tagged to the admin
        const assignments = await Assignment.find({ admin: req.user?._id }).populate('userId', 'name email');

        res.status(200).json({ assignments });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc    Update the status of an assignment to 'accepted'
 * @route   PUT /api/admins/assignments/:id/accept
 * @access  Admin
 * @param   {AuthenticatedRequest} req - The request object containing the assignment ID in params
 * @param   {Response} res - The response object to send the status or error message
 * @returns {Promise<void>}
**/
export const updateAssignmentStatusAccept = async (req: AuthenticatedRequest, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findById(id);
        if (assignment) {
            assignment.status = 'accepted';
            await assignment?.save();
            
            res.status(200).json({ message: `Assignment ${assignment.status}` });
            return;
        }
        
        res.status(404).json({ error: 'Assignment not found' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * @desc    Update the status of an assignment to 'rejected'
 * @route   PUT /api/admins/assignments/:id/reject
 * @access  Admin
 * @param   {AuthenticatedRequest} req - The request object containing the assignment ID in params
 * @param   {Response} res - The response object to send the status or error message
 * @returns {Promise<void>}
**/
export const updateAssignmentStatusReject = async (req: AuthenticatedRequest, res: Response) : Promise<void> => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findById(id);
        if (assignment) {
            assignment.status = 'rejected';
            await assignment?.save();

            res.status(200).json({ message: `Assignment ${assignment.status}` });
            return;
        }

        res.status(404).json({ error: 'Assignment not found' });
    }
    catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
