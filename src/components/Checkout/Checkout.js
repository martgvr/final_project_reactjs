import React from 'react'
import './checkout.css'

function Checkout() {
  return (
    <div className='checkout__container'>
      <div className='checkout__title'>
        <h1>Checkout</h1>
        <p>Por favor complete los datos para finalizar la compra.</p>
      </div>
      <div className='checkout__form'>
        <div className='checkout__form--fields'>1</div>
        <div className='checkout__form--cart'>2</div>
      </div>
    </div>
  )
}

export default Checkout