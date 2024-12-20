import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const colorPalette = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57', '#a4de6c', '#d47483', '#b6a5c6', '#f4b400',
];

const getColorForMotive = (index) => colorPalette[index % colorPalette.length];

const CrimeBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/crimes/stats');
        const result = await response.json();

        const formattedData = result.map((item) => ({
          biasMotive: item.bias_motive_description,
          crimeCount: parseInt(item.crime_count, 10),
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching crime data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="biasMotive" />
        <YAxis domain={[0, 600]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="crimeCount" name="Nombre de Crimes">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColorForMotive(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CrimeBarChart;
