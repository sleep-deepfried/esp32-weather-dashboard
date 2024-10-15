import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// Define an interface for the request body
interface SensorData {
  humidity: number;
  temperature_c: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { humidity, temperature_c }: SensorData = req.body;

    // Validate incoming data
    if (humidity === undefined || temperature_c === undefined) {
      return res.status(400).json({ message: 'Missing data' });
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
      const query = `INSERT INTO dht11_data (humidity, temperature_c)
                     VALUES (?, ?)`;
      const values = [humidity, temperature_c];

      await db.execute(query, values);
      await db.end();

      res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Database error' });
    }
  } else {
    res.status(406).json({ message: 'Only POST requests allowed' });
  }
}
