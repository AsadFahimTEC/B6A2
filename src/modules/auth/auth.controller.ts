import { Request, Response } from "express";
import { authServices } from "./auth.services";


const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authServices.loginUser(email, password);
        // console.log(result.rows[0]);
        res.status(201).json({
            success: true,
            message: "Login successful",
            data: result,
        });


    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const signUpUser = async (req: Request, res: Response) => {
    // const { email, password } = req.body;
    try {
        const result = await authServices.signUpUser(req.body);
        const user = result.rows[0];
        delete user.password;
        // console.log(result.rows[0]);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });


    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const authController = {
    loginUser,
    signUpUser,
}