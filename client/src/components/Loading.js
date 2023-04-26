import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export default function Loading() {
    return (
        <Box sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <CircularProgress />
        </Box>
    )
}
