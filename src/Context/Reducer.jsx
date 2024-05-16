const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
  }
};

export default cartReducer;
