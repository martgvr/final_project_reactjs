import React from 'react'
import './checkout.css'

import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { cartContext } from '../../context/cartContext'
import { useContext } from 'react'

function Checkout() {
  const { cart } = useContext(cartContext);
  console.log(cart);

  return (
    <div className='checkout__container'>
      <div className='checkout__title'>
        <h1>Checkout</h1>
        <p>Por favor complete los datos para finalizar la compra.</p>
      </div>

      <div className='checkout__form'>
        <div className='checkout__form--fields'>
          <TextField required id="outlined-required" label="Nombre completo" defaultValue="" fullWidth />
          <TextField required id="outlined-required" label="Teléfono" defaultValue="" fullWidth />
          <TextField required id="outlined-required" label="Mail" defaultValue="" fullWidth />
          <TextField required id="outlined-required" label="Dirección" defaultValue="" fullWidth />
          <Button variant="contained" color="success">Finalizar compra</Button>
        </div>

        <div className='checkout__form--cart'>
          <h3>Artículos a pagar:</h3>

          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', }} >
            {
              cart.map((item) => {
                const secondaryText = `${item.quantity} ${((item.quantity > 1) ? 'unidades' : 'unidad')}`;
                return(
                <ListItem>
                  <ListItemAvatar>
                  <Avatar alt={item.name} src={item.img} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={secondaryText} />
                </ListItem>)
              })
            }
          </List>
        </div>
      </div>
    </div>
  )
}

export default Checkout