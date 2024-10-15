import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// This function handles GET requests to fetch sensor data
export async function GET() {
    try {
        // Create a MySQL connection to Raspberry Pi using environment variables
        const db = await mysql.createConnection({
            host: process.env.DB_HOST, // MySQL host
            user: process.env.DB_USER, // MySQL user
            password: process.env.DB_PASSWORD, // MySQL password
            database: process.env.DB_NAME, // MySQL database name
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
