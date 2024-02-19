import React, { useReducer, createContext, useEffect } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.length > 0) {
        console.log(state.items.length);
        console.log('Hey');
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        console.log(existingItemIndex > -1);

        if (existingItemIndex > -1) {
          state.items[existingItemIndex].quantity += 1;
          state.items[existingItemIndex].totalPrice += state.items[existingItemIndex].price;
          state.totalAmount += state.items[existingItemIndex].price;
        }
        else {
          console.log('you2');
          return {
            items: [...state.items, { ...action.item, quantity: 1, totalPrice: action.item.price }],
            totalAmount: state.totalAmount + action.item.price
          };
        }
      }
      else {
        console.log('you');
        return {
          items: [...state.items, { ...action.item, quantity: 1, totalPrice: action.item.price }],
          totalAmount: state.totalAmount + action.item.price
        };
      }
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(item => item.id === action.id);
      if (!itemToRemove) {
        return state; // return current state if item to remove is not found
      }
      return {
        items: state.items.map(item => {
          if (item.id === action.id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.price };
            } else {
              return null;
            }
          } else {
            return item;
          }
        }).filter(item => item !== null),
        totalAmount: state.totalAmount - itemToRemove.price
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = {
    items: [],
    totalAmount: 0
  };

  const [cart, dispatch] = useReducer(cartReducer, JSON.parse(localStorage.getItem('cart')) || initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

