'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface WeatherData {
  timestamp: string;
  temperature: number;
  humidity: number;
}

export default function Home() {
  const [data, setData] = useState<WeatherData[]>([]);


  useEffect(() => {
    // Simulated data fetching
    const fetchData = () => {
      const newData = {
        timestamp: new Date().toLocaleTimeString(),
        temperature: Math.random() * 10 + 20, // Random temp between 20-30°C
        humidity: Math.random() * 20 + 40, // Random humidity between 40-60%
      }
      setData(prevData => [...prevData.slice(-19), newData]) // Keep last 20 data points
    }

    fetchData() // Initial fetch
    const interval = setInterval(fetchData, 5000) // Fetch every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-zinc-800 shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-5 text-center text-white">ESP32 Temperature & Humidity Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className='bg-zinc-700 border-zinc-700 text-white'>
              <CardHeader>
                <CardTitle>Temperature</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {data.length > 0 ? `${data[data.length - 1].temperature.toFixed(1)}°C` : 'N/A'}
                </p>
              </CardContent>
            </Card>
            <Card className='bg-zinc-700 border-zinc-700 text-white'>
              <CardHeader>
                <CardTitle>Humidity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">
                  {data.length > 0 ? `${data[data.length - 1].humidity.toFixed(1)}%` : 'N/A'}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}