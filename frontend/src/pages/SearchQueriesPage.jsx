import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const SearchQueriesPage = () => {
    const { query } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/db.json');
            const data = await response.json();
            setProducts(data.products.filter(product => product.name.toLowerCase().includes(query.toLowerCase())));
        };
        fetchProducts();
    }, [query]);
  return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Search Results for "{query}"</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map(product => (
                    <div key={product.id} className='bg-white p-4 rounded-md shadow-md cursor-pointer' onClick={() => navigate(`/product/${product.id}`)}>
                        <div>
                            <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
                        </div>
                        <h2 className='text-lg font-semibold'>{product.name}</h2>
                        <p className='text-gray-500'>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default SearchQueriesPage