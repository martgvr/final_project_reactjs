import React from 'react'
import './checkout.css'

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
import { useContext } from 'react'
import { cartContext } from '../../context/cartContext'
import { addToDatabase } from '../../services/firebase'

import { Formik } from 'formik';

function Checkout() {
  const { cart, clearCart } = useContext(cartContext);

  let status = cart.length === 0 ? true : false;
  let navigate = useNavigate();

  const breadcrumbs = [
    <Link to='/ ' underline="hover" key="1" color="inherit" href="/" >Tienda</Link>,
    <Link to='/cart' underline="hover" key="1" color="inherit" href="/" >Carrito</Link>,
    <Typography key="3" color="text.primary">Checkout</Typography>,
  ];

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
        
        <Formik
          initialValues={{ name: '', telephone: '', mail: '', address: '', }}

          validate={(values) => {
            let errors = {};

            if (!values.name) { errors.name = false } 
            else if (!/^[A-Z]{1,40} [A-Z]{1,40}$/i.test(values.name)) { errors.name = true }

            if (!values.mail) { errors.mail = false; } 
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.mail)) { errors.mail = true }

            if (!values.telephone) { errors.telephone = false } 
            else if (!/^[0-9\b]+$/.test(values.telephone)) { errors.telephone = true }

            if (!values.address) { errors.address = false } 
            else if (!/^[A-Z]{1,40} [0-9\b]{1,6}$/i.test(values.address)) { errors.address = true }

            return errors;
          }}

          onSubmit={(values) => {
            let total = 0;
            cart.forEach(item => total += (item.price * item.quantity));
            const dataToWrite = { buyer: { ...values }, items: [...cart], total: total, date: new Date() }

            clearCart(); // Limpia el carrito
            addToDatabase({ dataToWrite }); // Llama a la función addToDatabase
            navigate("../", { replace: true });
          }}>

          {({ errors, values, handleSubmit, handleChange, handleBlur }) => (
            <form className='checkout__form--fields' onSubmit={handleSubmit}>
              <TextField disabled={status} required id="outlined-required" label="Nombre y apellido" fullWidth name='name' value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name}/>
              <TextField disabled={status} required id="outlined-required" label="Teléfono" fullWidth name='telephone' value={values.telephone} onChange={handleChange} onBlur={handleBlur} error={errors.telephone}/>
              <TextField disabled={status} required id="outlined-required" label="Mail" fullWidth name='mail' value={values.mail} onChange={handleChange} onBlur={handleBlur} error={errors.mail}/>
              <TextField disabled={status} required id="outlined-required" label="Dirección" fullWidth name='address' value={values.address} onChange={handleChange} onBlur={handleBlur} error={errors.address}/>
              <Button type="submit" disabled={status} variant="contained" color="success">Finalizar compra</Button>
            </form>
          )}
        </Formik>

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