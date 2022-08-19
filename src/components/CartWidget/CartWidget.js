import './cartwidget.css';
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 13,
    padding: '0 4px',
  },
}));

function CartWidget() {
  return (
    <div>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={0} color="primary">
          <ShoppingCartIcon className="shoppingCart" />
        </StyledBadge>
      </IconButton>
    </div>
  )
}

export default CartWidget