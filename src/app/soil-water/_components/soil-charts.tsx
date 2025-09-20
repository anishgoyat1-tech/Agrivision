"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const moistureData = [
  { day: "Mon", value: 68 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 62 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 67 },
  { day: "Sat", value: 64 },
  { day: "Sun", value: 66 },
]

const tempData = [
  { day: "Mon", value: 22 },
  { day: "Tue", value: 24 },
  { day: "Wed", value: 23 },
  { day: "Thu", value: 25 },
  { day: "Fri", value: 26 },
  { day: "Sat", value: 24 },
  { day: "Sun", value: 23 },
]

const phData = [
  { day: "Mon", value: 6.5 },
  { day: "Tue", value: 6.6 },
  { day: "Wed", value: 6.5 },
  { day: "Thu", value: 6.7 },
  { day: "Fri", value: 6.8 },
  { day: "Sat", value: 6.7 },
  { day: "Sun", value: 6.6 },
]

const nutrientData = [
    { name: 'Nitrogen', value: 85 },
    { name: 'Phosphorus', value: 70 },
    { name: 'Potassium', value: 90 },
]

const chartConfig: ChartConfig = {
  value: {
    label: "Value",
  },
  moisture: {
    label: "Moisture (%)",
    color: "hsl(var(--chart-1))",
  },
  temperature: {
    label: "Temp (°C)",
    color: "hsl(var(--chart-2))",
  },
  ph: {
    label: "pH",
    color: "hsl(var(--chart-3))",
  },
   nutrients: {
    label: "Nutrient Level",
    color: "hsl(var(--chart-4))",
  },
}

export function SoilCharts() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Soil Moisture</CardTitle>
          <CardDescription>Weekly Average (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <LineChart data={moistureData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="value" type="monotone" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={true} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Soil Temperature</CardTitle>
          <CardDescription>Weekly Average (°C)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <LineChart data={tempData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="value" type="monotone" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={true} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Soil pH Level</CardTitle>
          <CardDescription>Weekly Average</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <LineChart data={phData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis domain={[6, 8]}/>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="value" type="monotone" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={true} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Nutrient Levels</CardTitle>
          <CardDescription>Relative Abundance</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-48 w-full">
             <BarChart data={nutrientData} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="value" layout="vertical" radius={5} fill="hsl(var(--chart-4))" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
