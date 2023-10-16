import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const Piechart = () => {
  const pieChartData = [
    { name: 'Category A', value: 30 },
    { name: 'Category B', value: 30 },
    { name: 'Category C', value: 10 },
    { name: 'Category D', value: 10 },
    { name: 'Category E', value: 10 },
    { name: 'Category F', value: 10 },
  ];

  const colors = ['blue', 'yellow', 'green'];

  return (
    <PieChart
      series={[
        {
          data: pieChartData,
          colors: colors,
          innerRadius: 0,
          outerRadius: 124,
          paddingAngle: 2,
          cornerRadius: 5,
          startAngle: -202,
          endAngle: 360,
          cx: 150,
          cy: 150,
        }
      ]}
    />
  );
};

export default Piechart;

