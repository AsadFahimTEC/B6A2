import { pool } from "../../config/db";

const createBookings = async (customer_id: number, vehicle_id: number, start: string, end: string) => {
    const vehicle = await pool.query(`SELECT daily_rent_price from vehicles WHERE id=$1 AND availability_status='available'`,
        [vehicle_id]
    );

    if(vehicle.rows.length === 0){
        throw new Error("Vehicle not available");
    }

    const price = Number(vehicle.rows[0].daily_rent_price);
    const days = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 *60 * 24);

    if(days<=0) throw new Error("Invalid rent period");

    const totalPrice = days * price;

    const booking = await pool.query(`INSERT into bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) 
        VALUES($1, $2, $3, $4, $5, 'active') RETURNING *`,
        [customer_id, vehicle_id, start, end, totalPrice]
    );

    await pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1 `,
        [vehicle_id]
    )
    const result = booking.rows[0];
    return result;

}

const getBookings = async () => {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result;
}


const updateBookings = async (vehicle_name: string, type: string, id: string) => {
    const result = await pool.query(`UPDATE bookings SET vehicle_name=$1, type=$2 WHERE id=$3 RETURNING *`, [vehicle_name, type, id]
    );

    return result;
}

const deleteBookings = async (id: string) => {
    const result = await pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);
    return result;
}



export const bookingServices = {
    createBookings,
    getBookings,
    updateBookings,
    deleteBookings,
}