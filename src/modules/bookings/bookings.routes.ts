import express from 'express';
import auth from '../../middleware/auth';
import { bookingControllers } from './bookings.controller';


const router = express.Router();

// app.use("/api/v1/bookings", bookingRoutes)

// routes -> controller -> service

router.post("/", auth("admin", "customer"), bookingControllers.createBookings);

router.get("/", auth("admin", "customer"), bookingControllers.getBookings);

router.put("/:bookingId", auth("admin", "customer"), bookingControllers.updateBookings);


export const bookingRoutes = router;