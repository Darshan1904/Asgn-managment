import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    user?: { _id: string; role: string };
}

export const authorize = (roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ error: "Forbidden: Access denied" });
            return;
        }
        next();
    };
};
