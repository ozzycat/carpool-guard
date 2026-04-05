import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL // update to actually call the right string
});

export async function getCarInfo(plate) {
    const client = await pool.connect(); // acquiring single db connection from connection pool. will wait if pool is full/busy.

    try {
        // determine if car exists
        const carRes = await client.query(); // have not populated test data yet. update later.

        // if car doesn't exist, return.
        if (carRes.rows.length === 0) {
            return {
                known: false,
                authorized: false,
                drivers: [],
                students: []
            };
        }

        // if car exists, get information
        const car = carRes.rows[0];

        // driver info
        const driver = await client.query(); // update with actual query to get driver info based on car id.

        // student info
        const students = await client.query(); // update with actual query to get student info based on car id.

        return {
            known: true,
            authorized: car.authorized, // update with actual field name from db.
            drivers: driver.rows, // update with actual field names from db.
            students: students.rows // update with actual field names from db.
        }
    } catch {

    } finally {
        client.release(); // returning checked out db client to connection pool for reuse. preventing leaked connections.
    }


}