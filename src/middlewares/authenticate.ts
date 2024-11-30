import jwt from "jsonwebtoken";
import config from "../config/default";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
    user?: { _id: string; role: string };
}

export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    // Check if the token is present in the headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Unauthorized access." });
        return;
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as AuthenticatedRequest["user"];
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token." });
    }
};
