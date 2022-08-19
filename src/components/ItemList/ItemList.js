import React from 'react'
import Item from '../Item/Item';

function ItemList({ data }) {
    return(
        data.map((element) => <Item key={element.key} name={element.name} type={element.type} price={element.price} stock={element.stock} img={element.img} id={element.key}/>)
    );
}

export default ItemList