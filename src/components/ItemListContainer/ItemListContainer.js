import { useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import Loading from '../Loading/Loading';
import './itemlistcontainer.css';

import { Link, useParams } from 'react-router-dom';
import { getData } from '../../services/firebase';

function ItemListContainer({ title }) {
  const [data, setData] = useState([]);
  const category = useParams().category;

  useEffect(() => {
    getData(category).then((res) => setData(res));
  }, [category])
  
  return (data.length == 0) ? 
    <Loading />
    :
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
  </div>;
}
 
export default ItemListContainer