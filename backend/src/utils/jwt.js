import "dotenv/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_TOKEN;

if (!JWT_SECRET) {
    throw new Error("JWT_TOKEN belum dikonfigurasi");
}

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "2h"
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};