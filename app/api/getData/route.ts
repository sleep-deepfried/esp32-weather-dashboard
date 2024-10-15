import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// This function handles GET requests to fetch sensor data
export async function GET(req: Request) {
    try {
        // Create a MySQL connection to Raspberry Pi
        const db = await mysql.createConnection({
            host: '192.168.41.193', // Raspberry Pi's IP address
            user: 'sleepdeepfried',
            password: '@Earlxdmysql14',  // Replace with your MySQL password
            database: 'DHT',
        });

        // Query to fetch data from the database
        const [rows] = await db.execute('SELECT * FROM dht11_data ORDER BY id DESC'); // Adjust as necessary

        await db.end();

        // Return the fetched data as JSON
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ message: 'Database error' }, { status: 500 });
    }
}
