import './cart.css'
import { cartContext } from '../../context/cartContext'
import { useContext } from 'react'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 14, },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover, },
  '&:last-child td, &:last-child th': { border: 0, },
}));

function Cart() {
  const { cart, removeItem, clearCart } = useContext(cartContext);

  let subtotal = 0;
  cart.map(item => subtotal += (item.price * item.quantity))

  return (
    <div className='cartcontainer'>
      <div className='cart__title'>Carrito</div>
      {cart.length > 0 ?

        <div className='cart__columns'>
          <div>
            <div className='emptycart__button'>
              <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => clearCart()}>Vaciar carrito</Button>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="tabla carrito">
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="right">PRECIO</StyledTableCell>
                    <StyledTableCell align="right">CANTIDAD</StyledTableCell>
                    <StyledTableCell align="right">TOTAL</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {cart.map((item) => (
                    <StyledTableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <StyledTableCell component="th" scope="row">
                        <div className='item__detail'>
                          <div className='item__detail--image' style={{ backgroundImage: `url(${item.img})` }}></div>
                          <div className='item__detail--text'>
                            <div>{item.name}</div>
                            <div>{item.description}</div>
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="right">{item.price}</StyledTableCell>
                      <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                      <StyledTableCell align="right">{item.price * item.quantity}</StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton aria-label="upload picture" component="label" onClick={() => removeItem(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className='resume__container'>
            <Card sx={{ minWidth: 275 }} variant="outlined">
              <CardContent>
                <div className='resume'>
                  <div>Subtotal</div><div>{subtotal}</div>
                  <div>Envío</div><div>0</div>
                </div>
              </CardContent>
              <CardActions>
              <Link to="/checkout">
                <Button variant="contained" color="success">Pagar</Button>
              </Link>
              </CardActions>
            </Card>
          </div>
        </div>

        :

        <div className='empty__cart'>
          <img src='https://i.ibb.co/b3xcKnM/empty-cart-retina.png' alt='Imagen carrito vacío' />
          <p>No hay items en el carrito</p>
          <Link to="/"><Button variant='contained' size="small" >Ir a los productos</Button></Link>
        </div>
      }
    </div>
  )
}

export default Cart