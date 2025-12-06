import { Request, Response } from "express";
import { bookingServices } from "./bookings.services";




const createBookings = async (req: Request, res: Response) => {
    // console.log(req.body);
    const {customer_id, vehicle_id, rent_start_date, rent_end_date} = req.body;
    try {
        const result = await bookingServices.createBookings(customer_id, vehicle_id, rent_start_date, rent_end_date);
        // console.log(result.rows[0]);
        const booking = result;
        delete booking.created_at;
        delete booking.updated_at;

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });


    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getBookings = async (req: Request, res: Response) => {
    try {
        const role = req.user!.role;
        const userId = req.user!.id;

        const result = await bookingServices.getBookings(role, userId);
         
        res.status(200).json({
            success: true,
            message: role=== "admin" ? "Bookings retrieved successfully": "Your bookings retrieved successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
}



const updateBookings = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    const { status } = req.body;
    const bookingId = req.params.bookingId as string;
    try {
        const result = await bookingServices.updateBookings(bookingId, status);
        // const vehicle = result.rows[0];
        // delete vehicle.created_at;
        // delete vehicle.updated_at;

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                
                message: status === "cancelled" ? "Booking cancelled successfully": "Booking marked as returned",
                data: result
            });
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
}


export const bookingControllers = {
    createBookings,
    getBookings,
    updateBookings,
}