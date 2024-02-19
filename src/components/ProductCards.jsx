import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCards = ({ product }) => {
    const { dispatch } = useContext(CartContext)

    const addToCart = () => {
        dispatch({ type: 'ADD_ITEM', item: product });
    };
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-2 pb-2">
            <img className="w-full" src={product.thumbnail} alt={product.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.title}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: ${product.price}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Rating: {product.rating}</span>
            </div>
            <button onClick={addToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mx-6">
                Add to cart
            </button>
        </div>
    )
}

export default ProductCards