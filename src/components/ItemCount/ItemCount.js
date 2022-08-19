import React, { useState } from 'react'
import './itemcount.css'

import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

function ItemCount( { initial, stock, color, onAdd, text }) {
    const [count, setCount] = useState(initial)

    const handleAdd = () => (count < stock) && setCount(count + 1);
    const handleRemove = () => (count > initial) && setCount(count - 1);

    let backStock = (stock > 0) ? '' : 'grey';

  return (
    <>
        <div className='itemcount__container'>
            <div className='itemcount__controls'>
                <Tooltip title="Restar unidad">
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => handleRemove()}>
                        <RemoveIcon />  
                    </IconButton>
                </Tooltip>

                <p style={{color: color}}>{count}</p>

                <Tooltip title="Agregar unidad">
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => handleAdd()}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <Button variant='contained' size="small" onClick={() => onAdd(count)} style={{backgroundColor: backStock}}>{text}</Button>
        </div>
    </>
  )
}

export default ItemCount