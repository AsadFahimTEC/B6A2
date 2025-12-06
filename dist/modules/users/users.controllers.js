import { userServices } from "./users.services";
const createUser = async (req, res) => {
    // console.log(req.body);
    try {
        const result = await userServices.createUser(req.body);
        // console.log(result.rows[0]);
        const user = result.rows[0];
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const getUser = async (req, res) => {
    try {
        const result = await userServices.getUser();
        const user = result.rows.map((user) => {
            delete user.password;
            delete user.created_at;
            delete user.updated_at;
            return user;
        });
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
const updateUser = async (req, res) => {
    // console.log(req.params.id);
    const { name, email } = req.body;
    try {
        const result = await userServices.updateUser(name, email, req.params.userId);
        const user = result.rows[0];
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: user,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
const deleteUser = async (req, res) => {
    // console.log(req.params.id);
    try {
        const result = await userServices.deleteUser(req.params.userId);
        const user = result.rows[0];
        delete user.password;
        delete user.created_at;
        delete user.updated_at;
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: user,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
export const userControllers = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
