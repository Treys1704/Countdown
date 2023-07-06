import React from 'react'
import { Button } from '@mui/material'

const ButtonComponent = ({ handleOpenModal }) => {
    return (
        <Button variant="contained" sx={{ background: '#7f78d2', mt: 4 }} onClick={handleOpenModal}>
            Éditer la date
        </Button>
    )
}

export default ButtonComponent