"use client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const PerformanceChart =({assessments}) =>{
    const [chartData,setChartData] = useState([]);
    useEffect(()=>{
        if (assessments){
            const formattedData = assessments.map((assessment) =>({
                date:format(new Date(assessment.createdAt),"MMM dd"),
                score:assessment.quizScore,
            }));
            setChartData(formattedData);
        }
    },[assessments]);
    return (
    <Card className=" bg-black/30 backdrop-blur-sm border border-gray-700 text-white shadow-2xl">
  <CardHeader>
    <CardTitle className="gradient-title text-3xl md:text-4xl">Performance Trend</CardTitle>
    <CardDescription>Your quiz scores over time</CardDescription>
    
  </CardHeader>
  <CardContent>
    <div className="h-[300px]">
         <ResponsiveContainer width="100%" height="100%">
      <LineChart
       
        data={chartData}
        
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 100]}/>
        <Tooltip content={({active,payload})=>{
            if(active && payload?.length){
                return(
                    <div className=" bg-black/50 backdrop-blur-md border border-gray-700 text-gray-100 shadow-2xl rounded-lg p-2">
                        <p className="text-sm font-medium">
                            score:{payload[0].value}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {payload[0].payload.date}
                        </p>
                    </div>
                )
            }
        }}/>
       
        <Line 
        type="monotone" 
        dataKey="score" 
       stroke="hsl(263, 70%, 60%)"

        strokeWidth={2}
        />
       
      </LineChart>
    </ResponsiveContainer>

    </div>
  </CardContent>
 
</Card>)
};

export default PerformanceChart;
