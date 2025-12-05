import express, { Request, Response } from 'express';
import config from "./config";
import initDB from "./config/db";
import { userRoutes } from './modules/users/users.routes';

const app = express();
const port = config.port;

// initializing DB
initDB();

// parser
app.use(express.json());
// app.use(express.urlencoded()); // for form data

// "/" -> localhost:5000/
app.get('/', (req: Request, res: Response) => {
    res.send('Hello Next Level Developers!')
})

// users CRUD
app.use("/users", userRoutes);

// vehicles CRUD
// app.use("/todos", todoRoutes);

// bookings crud
// app.use("/bookings", bookingRoutes)

// authentication
// app.use("/auth", authRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path,
    })
})

export default app;