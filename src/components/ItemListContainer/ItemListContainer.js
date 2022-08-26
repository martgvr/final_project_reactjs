import './itemlistcontainer.css';
import { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import { Link, useParams } from 'react-router-dom';

import firestoreDB from '../../services/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

function getProducts() {
  return new Promise((resolve) => {
    const productsCollection = collection(firestoreDB, 'products');
    getDocs(productsCollection).then(snapshot => {
      const docsData = snapshot.docs.map(doc => {
        return { ...doc.data(), key: doc.id }
      });
      resolve(docsData);
    })
  })
}

function getByCategory(category) {
  return new Promise((resolve) => {
    const productsCollection = collection(firestoreDB, 'products');
    const q = query(productsCollection, where('category', '==', category))
    getDocs(q).then(snapshot => {
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
    if (category == undefined) {
      getProducts().then((res) => setData(res))
    } else {
      getByCategory(category).then((res) => setData(res))
    }
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