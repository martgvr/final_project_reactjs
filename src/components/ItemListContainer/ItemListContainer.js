import { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import Loading from '../Loading/Loading';
import './itemlistcontainer.css';

import { Link, useParams } from 'react-router-dom';
import { getData } from '../../services/firebase';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function ItemListContainer({ title }) {
  const [data, setData] = useState([]);
  const category = useParams().category;

  useEffect(() => {
    getData(category).then((res) => setData(res));
  }, [category])

  const breadcrumbs = [
    <Link to='/ ' underline="hover" key="1" color="inherit" href="/" >Tienda</Link>,
    <Typography key="3" color="text.primary">Productos</Typography>,
  ];

  return (data.length === 0) ?
    <Loading />
    :
    <div className='itemlist__container'>
      <div>
        <h2>{title}</h2>

        <Stack spacing={2} style={{paddingBottom: '20px'}}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>

      </div>

      <div className='itemlist'>
        <div className='categories'>
          <h3>Categorías</h3>
          <Link to="/category/tshirt">Remeras</Link>
          <Link to="/category/tanktop">Musculosas</Link>
          <Link to="/category/pant">Pantalones</Link>
        </div>

        <div className='items'>
          <ItemList data={data} />
        </div>
      </div>
    </div>;
}

export default ItemListContainer