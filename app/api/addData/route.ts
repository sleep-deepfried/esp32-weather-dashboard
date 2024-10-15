import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Define an interface for the request body
interface SensorData {
    humidity: number;
    temperature_c: number;
}

export async function POST(req: Request) {
    const { humidity, temperature_c }: SensorData = await req.json();

    // Validate incoming data
    if (humidity === undefined || temperature_c === undefined) {
        return NextResponse.json({ message: 'Missing data' }, { status: 400 });
    }

    try {
        // Create a MySQL connection to Raspberry Pi
        const db = await mysql.createConnection({
            host: '192.168.41.193', // Raspberry Pi's IP address
            user: 'sleepdeepfried',
            password: '@Earlxdmysql14',  // Replace with your MySQL password
            database: 'DHT',
        });

        // Insert data into the MySQL database
        const query = `INSERT INTO dht11_data (humidity, temperature_c) VALUES (?, ?)`;
        const values = [humidity, temperature_c];

        await db.execute(query, values);
        await db.end();

        return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.json({ message: 'Database error' }, { status: 500 });
    }
}
