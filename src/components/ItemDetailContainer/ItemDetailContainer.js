import React from 'react'
import './itemdetailcontainer.css'
import ItemDetail from '../ItemDetail/ItemDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import firestoreDB from '../../services/firebase';
import { getDocs, collection } from 'firebase/firestore';

function ItemDetailContainer({ title }) {
    const [data, setData] = useState([]);
    const { key } = useParams();

    function getProducts() {
        return new Promise((resolve) => {
            const productsCollection = collection(firestoreDB, 'productos');
            getDocs(productsCollection).then(snapshot => {
              const docsData = snapshot.docs.map(doc => {
                return { ...doc.data(), key: doc.id }
              });
              let itemRequested = docsData.find((elemento) => elemento.key === key);
              resolve(itemRequested);
            })
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
                <ItemDetail id={data.key} key={data.key} name={data.name} price={data.price} stock={data.stock} img={data.img} rating={data.rating} description={data.description} />
            </div>
        </div>
    );
}

export default ItemDetailContainer