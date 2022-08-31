import './itemdetail.css'
import { Link } from "react-router-dom";
import ItemCount from '../ItemCount/ItemCount';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

import React, { useContext, useState } from 'react'
import { cartContext } from '../../context/cartContext'

function ItemDetail({ id, name, price, stock, img, rating, description }) {
  const [showCartButton, setShowCartButton] = useState(null);
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
        <Rating className='text__container--rating' name="read-only" value={rating} readOnly />
        <p className='text__container--price'>$ {price}</p>

        {
          showCartButton === 1 ?
            <><Link to="/"><Button variant='contained' size="small" style={{marginRight: '10px'}}>Seguir comprando</Button></Link>
            <Link to="/cart"><Button variant='contained' size="small" >Ir al carrito</Button></Link></>:
            <ItemCount initial={1} stock={stock} color={'#000'} onAdd={handleAdd} text={'Agregar al carrito'} />
        }

      </div>
    </div>
  )
}

export default ItemDetail