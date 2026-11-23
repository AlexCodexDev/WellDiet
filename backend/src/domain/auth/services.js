import bcrypt from "bcryptjs";
import * as DAO from "./dao.js";
import { generateToken } from "../../utils/jwt.js";

export const RegisterServices = async (data) => {
    const { name, email, password } = data;

    if(!name) {
        throw new Error("Name cannot be empty.");
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

    const newuser = await DAO.Register({
        name,
        email,
        password: hashedPassword
    });

    return {
        id: users.id,
        name,
        email
    }
}

export const Login = async (data) => {
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
        email: user.email
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}