import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'
import { tokens } from '../Themes'

const Header = ({title, subtitle}) => {
    const theme= useTheme();
    const colors = tokens (theme.palette.mode)
  return (
    <Box marginBottom="30px">
        <Typography variant='h2' color="lightblack" fontWeight="bold" sx={{marginBottom: "5px",marginLeft:"25px"}}>{title}</Typography>
        <Typography variant='h5' color={colors.greenAccent[400]} sx={{marginLeft:"25px"}}>{subtitle}</Typography>
    </Box>
  )
}

export default Header
