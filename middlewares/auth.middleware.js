import { verifyToken } from "../utils/jwt.js";
export const authCandidate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
};