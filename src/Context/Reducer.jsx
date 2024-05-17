const cartReducer = (state, action) => {
  const selectedFilters = { ...state.selectedFilters };
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
        selectedFilters,
      };

    case "TOGGLE_THEME":
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case "SET_FILTER":
      let { filterOn, item, bool } = action.payload;

      selectedFilters[filterOn].add(item);
      if (!bool) {
        selectedFilters[filterOn].delete(item);
      }

      return {
        ...state,
        selectedFilters,
      };

    case "SET_PRICE_FILTER":
      const { min, max } = action.payload;

      selectedFilters.selectedPriceRange.min = min;
      selectedFilters.selectedPriceRange.max = max;
      return {
        ...state,
        selectedFilters,
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
