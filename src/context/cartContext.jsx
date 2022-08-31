import { createContext, useState } from 'react';

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const cartCopy = [...cart];

  const isInCart = (id) => cart.some(item => item.id === id);

  const addToCart = (itemToCart, quantity) => {
    if (!isInCart(itemToCart.id)) {
      cartCopy.push( {...itemToCart, quantity: quantity} );
      setCart(cartCopy);
    } else {
      const itemIndex = cartCopy.findIndex(item => item.id === itemToCart.id);
      cartCopy[itemIndex].quantity += quantity;
      setCart(cartCopy);
    }
  }

  const clearCart = () => setCart([]);

  const removeItem = (id) => {
    if (isInCart(id)) {
      const itemIndex = cartCopy.findIndex((item) => item.id === id);
      cartCopy.splice(itemIndex, 1);
      setCart(cartCopy);
    }
  };

  return(
    <cartContext.Provider value={{ cart, addToCart, clearCart, removeItem }}>
      {children}
    </cartContext.Provider>
  )
}