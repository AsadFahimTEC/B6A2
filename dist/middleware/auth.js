import jwt from "jsonwebtoken";
import config from "../config";
// roles = ["admin", "customer"]
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const authToken = req.headers.authorization;
            // console.log({ authToken: token });
            if (!authToken || !authToken.startsWith("Bearer ")) {
                return res.status(500).json({ message: "You are not allowed!!" });
            }
            const finalToken = authToken.split(" ")[1];
            const decoded = jwt.verify(finalToken, config.jwtSecret);
            console.log({ decoded });
            req.user = decoded;
            // ["admin"]
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(500).json({
                    error: "unauthorized!!",
                });
            }
            next();
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    };
};
export default auth;
