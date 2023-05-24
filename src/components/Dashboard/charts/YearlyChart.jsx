import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import React from 'react';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale);

export default function YearlyChart({ chartData, title }) {
    const chart = {
        labels: chartData?.map((entry) => {
            const year = Object.keys(entry)[0]; // Get the year dynamically
            return entry[year].year;
        }),
        datasets: [
            {
                label: 'Income',
                data: chartData?.map((entry) => {
                    const year = Object.keys(entry)[0]; // Get the year dynamically
                    return entry[year].income;
                }),
                backgroundColor: '#2563eb',
                hoverBackgroundColor: '#1d4ed8',
                borderRadius: 15,
            },
            {
                label: 'Expenditure',
                data: chartData?.map((entry) => {
                    const year = Object.keys(entry)[0]; // Get the year dynamically
                    return entry[year].expenditure;
                }),
                backgroundColor: '#dc2626',
                hoverBackgroundColor: '#b91c1c',
                borderRadius: 15,
            },
        ],
    };

    return (
        <div className="w-full mx-auto p-7 rounded-xl border shadow-2xl">
            <h1 className="text-center text-2xl font-bold mb-5">{title}</h1>
            <Bar data={chart} />
        </div>
    );
}
