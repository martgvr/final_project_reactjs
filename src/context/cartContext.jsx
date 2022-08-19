import { createContext, useState } from 'react';

// Inicializamos un context
export const cartContext = createContext();

// Creamos un provider
export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const cartCopy = [...cart];

  const isInCart = (id) => cartCopy.some(item => item.id === id);

  const addToCart = (itemToCart, quantity) => {
    if (!isInCart(itemToCart.id)) {
      cartCopy.push( {...itemToCart, quantity: quantity} );
      setCart(cartCopy);

      console.log(`Total: ${quantity} unidades de ${itemToCart.name}`);
    } else {
      const itemIndex = cartCopy.findIndex(item => item.id === itemToCart.id);
      cartCopy[itemIndex].quantity += quantity;

      console.log(`Total: ${cartCopy[itemIndex].quantity} unidades de ${itemToCart.name}`);
    }
  }

  const clearCart = () => setCart([]);

  // Falta removeFromCart()

  return(
    <cartContext.Provider value={{ cart, addToCart }}>
      {children}
    </cartContext.Provider>
  )
}