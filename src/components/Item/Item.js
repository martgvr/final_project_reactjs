import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './item.css';

import { Link } from "react-router-dom";

function Item({ name, type, price, stock, img, id }) {
  return (
    <Link to={`/detail/${id}`}>
      <Card sx={{ maxWidth: 345 }} className='cardHover'>
        <CardMedia component="img" alt={name} height="140" image={img} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">{name}</Typography>
          <Typography variant="body2" color="text.secondary">$ {price}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Item