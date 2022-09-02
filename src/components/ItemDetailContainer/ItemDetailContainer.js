import React, { useEffect, useState } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail';
import Loading from '../Loading/Loading';
import './itemdetailcontainer.css'

import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useParams } from 'react-router-dom';
import { getByKey } from '../../services/firebase';

function ItemDetailContainer({ title }) {
    const [data, setData] = useState([]);
    const { key } = useParams();

    const breadcrumbs = [
        <Link to='/' underline="hover" key="1" color="inherit" href="/" >Tienda</Link>,
        <Link to='/ ' underline="hover" key="1" color="inherit" href="/" >Productos</Link>,
        <Typography key="3" color="text.primary">Detalle</Typography>,
    ];

    useEffect(() => {
        getByKey(key).then((res) => setData(res));
    }, [key])

    return (data.length === 0) ?
        <Loading />
        :
        <div className='itemdetail__container'>
            <div>
                <h2>{title}</h2>
                <Stack spacing={2} style={{ paddingBottom: '20px' }}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Stack>
            </div>
            <ItemDetail id={data.key} key={data.key} name={data.name} price={data.price} stock={data.stock} img={data.img} rating={data.rating} description={data.description} />
        </div>;
}

export default ItemDetailContainer