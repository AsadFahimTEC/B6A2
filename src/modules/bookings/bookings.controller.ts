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
        const result = await bookingServices.getBookings();

        const user = result.rows.map((user: any) => {
            //  delete user.password;
            delete user.created_at;
            delete user.updated_at;
            return user;
        });

        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: user,
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
    const { vehicle_name, type } = req.body;
    try {
        const result = await bookingServices.updateBookings(vehicle_name, type, req.params.vehicleId as string);
        const vehicle = result.rows[0];
        delete vehicle.created_at;
        delete vehicle.updated_at;

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: vehicle,
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

const deleteBookings = async (req: Request, res: Response) => {
    // console.log(req.params.id);
    try {
        const result = await bookingServices.deleteBookings(req.params.vehicleId as string);
        const user = result.rows[0];
        delete user.created_at;
        delete user.updated_at;

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
                data: user,
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
    deleteBookings ,
}