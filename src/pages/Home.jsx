import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductCards from '../components/ProductCards'
import axios from 'axios';
import { AuthContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import ReactModal from 'react-modal';

const Home = () => {

  const navigate = useNavigate()

  const { isLoggedIn } = useContext(AuthContext);
  const { cart, dispatch } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchPrice, setSearchPrice] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
  }, [isLoggedIn, navigate]);


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()) &&
    (searchPrice > 0 ? product.price <= searchPrice : true)
  );

  
const cartTotal = cart.items.reduce((total, product) => total + product.totalPrice, 0);

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col items-center mt-3 w-full'>
        <div className='flex flex-col w-full items-center'>
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
        <div>
          <div className="flex flex-col items-center justify-center bg-gray-100 p-4 absolute top-2 right-6">
            <p className="text-2xl font-bold mb-4">Cart Total : {cartTotal}</p>
            <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open Cart
            </button>
          </div>
          <ReactModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                {cart.items.map((product) => (
                  <div key={product.id} className="p-6">
                    <img src={product.images[0]} alt={product.name} className="w-full h-64 object-cover" />
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-gray-900 font-semibold">Quantity: {product.quantity}</p>
                    <p className="text-gray-900 font-semibold">Total Price: {product.totalPrice}</p>
                    <button onClick={() => removeFromCart(product.id)} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Remove
                    </button>
                  </div>
                ))}
                <button onClick={closeModal} className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Close
                </button>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-6">
        {filteredProducts.map(product => <ProductCards key={product.id} product={product} />)}
      </div>
    </div>
  )
}

export default Home