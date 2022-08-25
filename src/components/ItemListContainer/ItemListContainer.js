import './itemlistcontainer.css';
import { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import { Link, useParams } from 'react-router-dom';

import firestoreDB from '../../services/firebase';
import { getDocs, collection } from 'firebase/firestore';

function getProducts() {
  return new Promise((resolve) => {
    const productsCollection = collection(firestoreDB, 'productos');
    getDocs(productsCollection).then(snapshot => {
      const docsData = snapshot.docs.map(doc => {
        return { ...doc.data(), key: doc.id }
      });
      resolve(docsData);
    })
  })
}

function ItemListContainer({ title }) {
  const [data, setData] = useState([]);
  const category = useParams().category;

  useEffect(() => {
    getProducts().then((res) => {
      if (category !== undefined) {
        let getProduct = res.filter(element => element.category === category);
        setData(getProduct);
      } else {
        setData(res);
      }
    });
  }, [category])
  
  return (
    <div className='itemlist__container'>
      <div>
        <h2>{title}</h2>
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

    </div>
  )
}
 
export default ItemListContainer