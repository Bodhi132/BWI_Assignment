import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductCards from '../components/ProductCards'
import axios from 'axios';
import { AuthContext } from '../context/UserContext';
import { useContext } from 'react';

const Home = () => {

  const navigate = useNavigate()

  const { isLoggedIn } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchPrice, setSearchPrice] = useState(0);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products])

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn,navigate]);


  const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase()) &&
  (searchPrice > 0 ? product.price <= searchPrice : true)
);



  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center mt-3'>
        <input
          type="text"
          placeholder='Enter Product name'
          onChange={e => setSearch(e.target.value)}
          className="shadow appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="number"
          placeholder='Enter Product Price'
          onChange={e => setSearchPrice(e.target.value)}
          className="shadow appearance-none border rounded w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredProducts.map(product => <ProductCards key={product.id} product={product} />)}
      </div>
    </div>
  )
}

export default Home