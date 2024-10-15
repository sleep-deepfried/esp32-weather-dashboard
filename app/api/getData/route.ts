import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM dht11_data ORDER BY id DESC'); // Adjust as necessary
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({ message: 'Database error', error: error }, { status: 500 });
    }
}
