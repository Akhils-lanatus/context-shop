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

    case "TOGGLE_THEME":
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case "SET_FILTER":
      state.selectedFilters[action.payload.filterOn].add(action.payload.item);
      if (!action.payload.bool) {
        state.selectedFilters[action.payload.filterOn].delete(
          action.payload.item
        );
      }
      return {
        ...state,
      };

    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        selectedFilters: {
          deliveryDays: new Set(),
          selectedBrand: new Set(),
          selectedRatings: new Set(),
          availableInStock: false,
        },
      };
  }
};

export default cartReducer;
