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
import { useContext, useState } from 'react'

function Checkout() {
  const [formData, setFormData] = useState({ name: '', telephone: '', mail: '', address: '' });
  const { cart } = useContext(cartContext);

  const handleSubmit = () => {
    console.log(formData);
    setFormData({ name: '', telephone: '', mail: '', address: '' });
  }
  
  function onChangeHandle(evt) {
    const value = evt.target.value;
    const name = evt.target.name;

    let formDataCopy = { ...formData };
    formDataCopy[name] = value;
    setFormData(formDataCopy);
  }

  return (
    <div className='checkout__container'>
      <div className='checkout__title'>
        <h1>Checkout</h1>
        <p>Por favor complete los datos para finalizar la compra.</p>
      </div>

      <div className='checkout__form'>
        <div className='checkout__form--fields'>
          <TextField required id="outlined-required" label="Nombre completo" fullWidth onChange={  onChangeHandle } name='name' value={formData.name} />
          <TextField required id="outlined-required" label="Teléfono" fullWidth onChange={  onChangeHandle } name='telephone' value={formData.telephone} />
          <TextField required id="outlined-required" label="Mail" fullWidth onChange={  onChangeHandle } name='mail' value={formData.mail} />
          <TextField required id="outlined-required" label="Dirección" fullWidth onChange={  onChangeHandle } name='address' value={formData.address} />
          <Button variant="contained" color="success" onClick={ () => handleSubmit() }>Finalizar compra</Button>
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