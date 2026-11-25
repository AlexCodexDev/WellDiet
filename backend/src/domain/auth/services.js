import bcrypt from "bcryptjs";
import * as DAO from "./dao.js";
import { generateToken } from "../../utils/jwt.js";

export const RegisterServices = async (data) => {
    const { username, email, password } = data;

    if(!username) {
        throw new Error("Username cannot be empty.");
    }

    if(!email) {
        throw new Error("Email cannot be empty.");
    }

    if(!password) {
        throw new Error("Passowrd cannot be empty.");
    }

    const existingUser = await DAO.FindUserByEmail(email);

    if(existingUser) {
        throw new Error("Email have already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await DAO.Register({
        username,
        email,
        password: hashedPassword
    });

    return {
        id: result.id,
        username,
        email
    }
}

export const LoginServices = async (data) => {
    const { email, password } = data;

    if(!email) {
        throw new Error("Email cannot be empty.");
    }

    if(!password) {
        throw new Error("Password cannot be empty.");
    }

    const user = await DAO.FindUserByEmail(email);

    if(!user) {
        throw new Error("Email or Password wrong.");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordValid) {
        throw new Error("Email or Password wrong.");
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
    });

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    }
}