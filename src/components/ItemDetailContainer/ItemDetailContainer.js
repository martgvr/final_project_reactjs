import React, { useEffect, useState } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail';
import Loading from '../Loading/Loading';
import './itemdetailcontainer.css'

import { useParams } from 'react-router-dom';
import { getByKey } from '../../services/firebase';

function ItemDetailContainer({ title }) {
    const [data, setData] = useState([]);
    const { key } = useParams();

    useEffect(() => {
        getByKey(key).then((res) => setData(res));
    }, [])

    return (data.length === 0) ?
        <Loading />
        :
        <div className='itemdetail__container'>
            <div>
                <h2>{title}</h2>
            </div>
            <div>
                <ItemDetail id={data.key} key={data.key} name={data.name} price={data.price} stock={data.stock} img={data.img} rating={data.rating} description={data.description} />
            </div>
        </div>;
}

export default ItemDetailContainer