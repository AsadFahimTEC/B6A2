import express from 'express';
import { userControllers } from './users.controllers';
import auth from '../../middleware/auth';
const router = express.Router();

// app.use("/api/v1/users", userRoutes)

// routes -> controller -> service

router.post("/api/v1", userControllers.createUser);

router.get("/api/v1",  auth("admin"), userControllers.getUser);

router.get("/api/v1/:userId", auth("admin", "user"), userControllers.getSingleUser);

router.put("/api/v1/:userId", auth("admin", "user"), userControllers.updateUser);

router.delete("/api/v1/:userId", auth("admin"), userControllers.deleteUser);

export const userRoutes = router;