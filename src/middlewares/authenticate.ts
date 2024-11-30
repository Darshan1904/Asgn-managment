import jwt from 'jsonwebtoken';
import config from '../config/default';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    user?: string | object;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Unauthorized access." });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token." });
    }
};