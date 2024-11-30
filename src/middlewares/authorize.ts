import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: {
        role?: string;
    };
}

export const authorizeAdminRoles = (...roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied. Insufficient permissions." });
        }
        next();
    };
};
