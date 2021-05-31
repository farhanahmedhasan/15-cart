const reducer = (state, action) => {
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }

  if (action.type === 'DISPLAY_ITEM') {
    return { ...state, loading: false, cart: action.payload };
  }

  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    const newCart = action.payload;
    return {
      ...state,
      cart: newCart,
    };
  }

  //----------------------------TOGGLE AMONUT IN CART----------------------------
  if (action.type === 'TOOGLE_AMOUNT') {
    const { id, type } = action.payload;

    const newCart = state.cart
      .map((item) => {
        if (item.id === id) {
          if (type === 'increase') return { ...item, amount: item.amount + 1 };
          if (type === 'decrease') return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((item) => item.amount > 0);

    return {
      ...state,
      cart: newCart,
    };
  }

  if (action.type === 'GET_TOTALS') {
    const { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.amount += amount;
        cartTotal.total += amount * price;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    return {
      ...state,
      amount,
      total: +total.toFixed(2),
    };
  }

  throw new Error('No matching action type ');
};

export default reducer;
