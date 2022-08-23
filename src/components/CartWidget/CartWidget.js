import './cartwidget.css';
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { cartContext } from '../../context/cartContext'
import { useContext } from 'react'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': { right: -5, top: 13, padding: '0 4px', },
}));

function CartWidget() {
  const { cart } = useContext(cartContext);

  let cartQuantity = 0;
  cart.map(item => {
    cartQuantity += item.quantity;
    return 0;
  })

  return (
    <div>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={cartQuantity} color="primary">
          <ShoppingCartIcon className="shoppingCart" />
        </StyledBadge>
      </IconButton>
    </div>
  )
}

export default CartWidget