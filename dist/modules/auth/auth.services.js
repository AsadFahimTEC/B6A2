import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../../config";
const loginUser = async (email, password) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return false;
    }
    const token = jwt.sign({ name: user.name, email: user.email, role: user.role }, config.jwtSecret, {
        expiresIn: "7d"
    });
    console.log({ token });
    delete user.password;
    delete user.created_at;
    delete user.updated_at;
    return { token, user };
};
const signUpUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    const hashedPass = await bcrypt.hash(password, 10);
    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role]);
    return result;
};
export const authServices = {
    loginUser,
    signUpUser,
};
