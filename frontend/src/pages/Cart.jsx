import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const handleBuyNow = () => {
        // Implement buy now functionality
        console.log('Buy Now clicked');
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-4xl font-orbitron font-bold mb-8'>Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className='space-y-4'>
                        {cart.map((item) => (
                            <li key={item.id} className='flex justify-between items-center border-b pb-4'>
                                <div className='flex items-center'>
                                    <img src={item.image} alt={item.name} className='w-20 h-20 object-cover mr-4' />
                                    <div>
                                        <h2 className='text-xl font-semibold'>{item.name}</h2>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className='bg-red-500 text-white px-3 py-1 rounded'
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className='mt-8'>
                        <p className='text-xl font-bold'>Total: ${totalPrice.toFixed(2)}</p>
                        <button
                            onClick={handleBuyNow}
                            className='bg-green-500 text-white px-6 py-2 rounded mt-4'
                        >
                            Buy Now
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart
