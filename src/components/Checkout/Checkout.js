import React from 'react'
import './checkout.css'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { addToDatabase } from '../../services/firebase'

function Checkout() {
  const [formData, setFormData] = useState({ name: '', telephone: '', mail: '', address: '' });
  const { cart, clearCart } = useContext(cartContext);

  let status = cart.length === 0 ? true : false;
  let navigate = useNavigate();

  const breadcrumbs = [
    <Link to='/ ' underline="hover" key="1" color="inherit" href="/" >Tienda</Link>,
    <Link to='/cart' underline="hover" key="1" color="inherit" href="/" >Carrito</Link>,
    <Typography key="3" color="text.primary">Checkout</Typography>,
  ];

  function handleSubmit() {
    let total = 0;
    cart.forEach(item => total += (item.price * item.quantity));

    const dataToWrite = {
      buyer: { ...formData },
      items: [...cart],
      total: total,
      date: new Date()
    }

    // Checkeo que los input estén completos
    let readyToWrite = null;
    for (const property in formData) { if (formData[property] === "") { readyToWrite = 0 } }

    if (readyToWrite === 0) {
      alertify.error('Por favor complete todos los campos');
    } else {
      clearCart(); // Limpia el carrito
      setFormData({ name: '', telephone: '', mail: '', address: '' }); // Resetea los campos
      addToDatabase({ dataToWrite }); // Llama a la función addToDatabase
      navigate("../", { replace: true });
    }
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
        <Stack spacing={2} style={{ paddingBottom: '20px' }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <p>Por favor complete los datos para finalizar la compra.</p>
      </div>

      <div className='checkout__form'>
        <div className='checkout__form--fields'>
          <TextField disabled={status} required id="outlined-required" label="Nombre completo" fullWidth onChange={onChangeHandle} name='name' value={formData.name} />
          <TextField disabled={status} required id="outlined-required" label="Teléfono" fullWidth onChange={onChangeHandle} name='telephone' value={formData.telephone} />
          <TextField disabled={status} required id="outlined-required" label="Mail" fullWidth onChange={onChangeHandle} name='mail' value={formData.mail} />
          <TextField disabled={status} required id="outlined-required" label="Dirección" fullWidth onChange={onChangeHandle} name='address' value={formData.address} />
          <Button disabled={status} variant="contained" color="success" onClick={() => handleSubmit()}>Finalizar compra</Button>
        </div>

        <div className='checkout__form--cart'>
          <h3>Artículos a pagar:</h3>

          {cart.length > 0 ?
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', }} >
              {
                cart.map((item) => {
                  const secondaryText = `${item.quantity} ${((item.quantity > 1) ? 'unidades' : 'unidad')}`;
                  return (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar alt={item.name} src={item.img} />
                      </ListItemAvatar>
                      <ListItemText primary={item.name} secondary={secondaryText} />
                    </ListItem>)
                })
              }
            </List>
            :
            <>
              <p>No hay articulos en el carrito</p>
              <Link to="/"><Button variant='contained' size="small" >Ir a los productos</Button></Link>
            </>
          }

        </div>
      </div>
    </div>
  )
}

export default Checkout