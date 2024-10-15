import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, setCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};