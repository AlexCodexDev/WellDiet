import * as Services from "./services";

const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 2 * 60 * 60 * 1000,
    path: "/"
};

export const RegisterController = async (req, res) => {
    try {
        const user = await Services.RegisterServices(req.body);

        return res.status(201).json({
            message: "Register success.",
            data: user
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const LoginController = async (req, res) => {
    try {
        const result = await Services.Login(req.body);

        res.cookie("token", result.token, cookieOptions);

        return res.status(200).json({
            message: "Login success.",
            data: result.user
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const LogoutController = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        path: "/"
    });

    return res.status(200).json({
        message: "Logout success."
    })
}