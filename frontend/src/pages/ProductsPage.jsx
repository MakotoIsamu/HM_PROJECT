import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products); // Initialize both state variables
      });
  }, []);

  const category = [
    "tops", 
    "bottoms", 
    "outerwear"
  ];

  const filterProducts = (category) => {
    if (category === 'All') {
      setFilteredProducts(products); // Reset to original list
    } else {
      setFilteredProducts(products.filter(product =>
        product.category.includes(category.toLowerCase())
      ));
    }
  };

  const sortProducts = (sortBy) => {
    const sortedProducts = [...filteredProducts];
    if (sortBy === 'price-asc') {
      setFilteredProducts(sortedProducts.sort((a, b) => a.price - b.price));
    } else if (sortBy === 'price-desc') {
      setFilteredProducts(sortedProducts.sort((a, b) => b.price - a.price));
    }

  };

  return (
    <div className='px-4 w-screen overflow-x-hidden'>
      <h1 className='text-center text-7xl font-bold'>All Products</h1>
      <div className='overflow-x-scroll py-10'>
        {category.map((category) => (
          <button
            key={category}
            className='border border-black px-6 py-2 font-orbitron text-xl uppercase'
            onClick={() => filterProducts(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className='flex justify-between items-center mb-10'>
        <p className='text-2xl font-bold'>{filteredProducts.length} Products</p>
        <select className='text-xl font-orbitron border border-black px-4 py-2' onChange={(e) => sortProducts(e.target.value)}>
            <option disabled>SORT BY</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className='grid grid-cols-4 w-full'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='border border-black cursor-pointer' onClick={() => navigate(`/product/${product.id}`)}>
            <div>
                <img
                src={product.image}
                alt={product.name}
                className='w-full h-full object-cover'
            />
            </div>
            <h2>{product.name}</h2>
            <p className='text-red-500'>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
