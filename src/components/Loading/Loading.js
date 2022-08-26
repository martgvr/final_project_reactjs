import React from 'react'
import './loading.css'
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <div className='loading__container'><CircularProgress /></div>
  )
}

export default Loading