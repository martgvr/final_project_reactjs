import './itemdetail.css'
// import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ItemCount from '../ItemCount/ItemCount';

// Importo useContext y cartContext
import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'

function ItemDetail({ id, name, price, stock, img, rating, description }) {

  // Desestructuro el context
  const { addToCart, removeItem, clearCart } = useContext(cartContext); 

  function handleAdd(quantity) {
    const itemToCart = { id, name, price, img, rating, description }
    addToCart(itemToCart, quantity);
  }

  return (
    <div className='itemdetail'>
      <div className='image__container' style={{backgroundImage: `url(${img})`}}></div>
      <div className='text__container'>
        <h3>{name}</h3>
        <p className='text__container--description'>{description}</p>
        <p className='text__container--price'>$ {price}</p>
        <p className='text__container--rating'>{rating} estrellas</p>

        <ItemCount initial={1} stock={stock} color={'#000'} onAdd={handleAdd} text={'Agregar al carrito'}/>
        <Button variant='contained' size="small" onClick={() => removeItem(id)}>Borrar del carrito</Button>
        <Button variant='contained' size="small" onClick={() => clearCart()}>Vaciar carrito</Button>

      </div>
    </div>
  )
}

export default ItemDetail