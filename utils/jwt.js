import jwt from "jsonwebtoken";
export const generateToken = (candidate) => {
    return jwt.sign({ id: candidate.id, email: candidate.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};