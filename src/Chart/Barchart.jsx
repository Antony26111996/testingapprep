import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material';
import { tokens } from '../Themes';

const Barchart = () => {
    // const customColors = ['#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2', '#f2f2f2'];
  return (
    <BarChart
    series={[
      { data: [3, 4, 1, 6, 5], stack: 'A', label: 'series A1' },
      { data: [4, 3, 1, 5, 8], stack: 'A', label: 'series A2' },
      { data: [4, 2, 5, 4, 1], stack: 'B', label: 'series B1' },
      { data: [2, 8, 1, 3, 1], stack: 'B', label: 'series B2' },
      { data: [10, 6, 5, 8, 9], label: 'series C1' },
    ]}
    colors={['red', 'green', 'blue']}
    width={600}
    height={350}
  />
  )
}

export default Barchart
