import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate  } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const ProductDetailsPage = () => {
    const [product, setProduct] = useState(null);
    const { cart, setCart } = useContext(CartContext);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/db.json')
          .then(response => response.json())
          .then(data => {
            const product = data.products.find(product => product.id === parseInt(id));
            setProduct(product);
          });
      }, [id]);

      const addToCart = (product) => {
        setCart([...cart, product]);
        navigate('/cart');
      };

  return (
    <div className='flex justify-center items-center h-screen'>
        {product ? (
            <div className='flex flex-col justify-center items-center'>
                <img src={product.image} alt={product.name} className='w-1/2 h-1/2' />
                <h1 className='text-4xl font-orbitron font-bold'>{product.name}</h1>
                <p className='text-xl'>{product.description}</p>
                <p className='text-xl'>{product.price}</p>
                <button className='bg-black text-white px-4 py-2 rounded-md mt-4 w-1/2 hover:bg-gray-800 transition-colors cursor-pointer' onClick={() => addToCart(product)}>Add to Cart</button>
                <button className='bg-black text-white px-4 py-2 rounded-md mt-4 w-1/2 hover:bg-gray-800 transition-colors cursor-pointer'>Buy Now</button>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
  )
}

export default ProductDetailsPage