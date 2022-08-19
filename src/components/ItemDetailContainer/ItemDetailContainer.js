import React from 'react'
import './itemdetailcontainer.css'
import itemsData from '../../data/data.js';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetailContainer({ title }) {
    const [data, setData] = useState([]);
    const { id } = useParams();

    function getProducts() {
        return new Promise((resolve) => {
            let itemRequested = itemsData.find((elemento) => elemento.key === Number(id));
            setTimeout(() => resolve(itemRequested), 1500);
        });
    }

    useEffect(() => {
        getProducts().then((res) => {
            setData(res);
        });
    }, [])

    return (
        <div className='itemdetail__container'>
            <div>
                <h2>{title}</h2>
            </div>
            <div>
                <ItemDetail id={data.key} name={data.name} price={data.price} stock={data.stock} img={data.img} rating={data.rating} description={data.description} />
            </div>
        </div>
    );
}

export default ItemDetailContainer