import auth from "../../middleware/auth";
import { vehicleControllers } from "./vehicles.controller";
import express from 'express';

const router = express.Router();

// app.use("/api/v1/vehicles", vehicleRoutes)

// routes -> controller -> service

router.post("/", auth("admin"), vehicleControllers.createVehicles);

router.get("/", vehicleControllers.getVehicles);

router.get("/:vehicleId", vehicleControllers.getSingleVehicles);

router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicles);

router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicles);

export const vehicleRoutes = router;