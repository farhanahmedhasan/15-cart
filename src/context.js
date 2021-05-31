import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: [],
  amount: 0,
  total: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: 'DISPLAY_ITEM', payload: data });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    const newCart = state.cart.filter((item) => item.id !== id);
    dispatch({ type: 'REMOVE_ITEM', payload: newCart });
  };

  const toggleItemAmount = (id, type) => {
    dispatch({ type: 'TOOGLE_AMOUNT', payload: { id, type } });
  };

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider value={{ ...state, clearCart, removeItem, toggleItemAmount }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
