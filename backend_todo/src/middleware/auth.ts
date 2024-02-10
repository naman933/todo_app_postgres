import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export function authMiddleware (req : any, res: any, next : any) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded : any = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded){
            req.body.userId = decoded.userId;
            next();
        }
    } catch (err) {
        return res.status(403).json({});
    }
};
