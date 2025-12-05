import express from 'express';

import { userControllers } from './users.controllers';
import auth from '../../middleware/auth';


const router = express.Router();

// app.use("/api/v1/users", userRoutes)

// routes -> controller -> service

router.post("/", userControllers.createUser);

router.get("/", auth("admin"), userControllers.getUser);

router.get("/:userId", auth("admin", "user"), userControllers.getSingleUser);

router.put("/:userId", auth("admin", "user"), userControllers.updateUser);

router.delete("/:userId", auth("admin"), userControllers.deleteUser);

export const userRoutes = router;