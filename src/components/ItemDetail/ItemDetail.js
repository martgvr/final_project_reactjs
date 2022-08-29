import './itemdetail.css'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ItemCount from '../ItemCount/ItemCount';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

// Importo useContext y cartContext
import React, { useContext, useState } from 'react'
import { cartContext } from '../../context/cartContext'

function ItemDetail({ id, name, price, stock, img, rating, description }) {
  const [showCartButton, setShowCartButton] = useState(null);

  // Desestructuro el context
  const { addToCart } = useContext(cartContext);

  function handleAdd(quantity) {
    alertify.success('Item agregado al carrito'); 
    const itemToCart = { id, name, price, img, rating, description }
    addToCart(itemToCart, quantity);
    setShowCartButton(1);
  }

  return (
    <div className='itemdetail'>
      <div className='image__container' style={{ backgroundImage: `url(${img})` }}></div>
      <div className='text__container'>
        <h3>{name}</h3>
        <p className='text__container--description'>{description}</p>
        <p className='text__container--price'>$ {price}</p>
        <p className='text__container--rating'>{rating} estrellas</p>

        {
          showCartButton === 1 ?
            <Link to="/cart"><Button variant='contained' size="small" >Ir al carrito</Button></Link> :
            <ItemCount initial={1} stock={stock} color={'#000'} onAdd={handleAdd} text={'Agregar al carrito'} />
        }

      </div>
    </div>
  )
}

export default ItemDetail