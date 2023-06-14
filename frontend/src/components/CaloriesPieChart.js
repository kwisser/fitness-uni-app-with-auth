import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';

const CaloriesPieChart = ({ consumed, total }) => {
    const remaining = total - consumed;
    const data = [
        { name: 'Consumed', value: consumed },
        { name: 'Remaining', value: Math.abs(remaining) },
    ];

    const COLORS = remaining < 0 ? ['#0088FE', '#FF0000'] : ['#0088FE', '#00C49F'];  // Red when negative

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip formatter={(value, name) => [value, name === 'Remaining' && remaining < 0 ? 'Exceeded' : name]} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CaloriesPieChart;
